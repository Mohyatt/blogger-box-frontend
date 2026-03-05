import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../data/category';
import { PostCreateInput } from '../../data/post';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost implements OnInit {
  form: FormGroup;
  categories$: Observable<Category[]>;

  private readonly Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(150)],
      ],
      categoryId: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
    });

    this.categories$ = this.categoryService.getAllCategories();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.Toast.fire({
        icon: 'warning',
        title: 'Please review your post',
      });
      return;
    }

    const value = this.form.value;
    const payload: PostCreateInput = {
      title: value.title,
      content: value.content,
      categoryId: value.categoryId,
    };

    this.postService.createPost(payload).subscribe({
      next: () => {
        this.Toast.fire({
          icon: 'success',
          title: 'Post Submitted Successfully',
        });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
        this.Toast.fire({
          icon: 'error',
          title: 'Submission failed',
        });
      },
    });
  }
}

