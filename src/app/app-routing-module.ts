import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostList } from './components/post-list/post-list';
import { AddPost } from './components/add-post/add-post';

const routes: Routes = [
  { path: '', component: PostList },
  { path: 'add-post', component: AddPost },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
