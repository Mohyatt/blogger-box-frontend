import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../data/category';
import { PostCreateInput } from '../../data/post';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost implements OnInit {
  form: FormGroup;
  categories$: Observable<Category[]>;

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
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Failed to create post', err);
      },
    });
  }
}

