import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from "./post/componentns/posts-list/posts-list.component";
import { PostDetailsComponent } from "./post/componentns/post-details/post-details.component";
import {LoginPageComponent} from "./login/components/login-page/login-page.component";
import {AuthGuard} from "./common/guards/auth.guard";

const routes: Routes = [
  {
  path: '',
  pathMatch: 'full',
  redirectTo: 'login'
},
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'add-post',
    component: PostDetailsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
