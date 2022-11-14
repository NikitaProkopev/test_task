import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post-service.service";
import { Post, PostListSettings } from "../../../common/intefraces/post-interfaces";
import { AuthService } from "../../../common/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  postsListSetting: PostListSettings = { page: 1, perPage: 10, filter: {} }
  postsList?: Post[];
  countOfPages: number = 0;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPostsList();
    this.postService.getPostsPagesCount(this.postsListSetting.perPage, this.postsListSetting.filter).subscribe((countPages) => {
      this.countOfPages = countPages;
    })
  }

  private getPostsList() {
    this.postService.getPosts(this.postsListSetting).subscribe((result) => {
      if(!result || result.length === 0) {
        this.postsList = [];
        return;
      }
        this.postsList = result
        console.log(this.postsList);
      }
    )
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onUpdatePostsList(postsSettings: PostListSettings): void {
    this.postsListSetting = postsSettings;
    console.log('start this get posts list');
    this.getPostsList();
  }

  onUpdatePostsListFilter(filter: Partial<Post>) {
    this.postsListSetting.filter = filter;
    this.getPostsList();
    this.postService.getPostsPagesCount(this.postsListSetting.perPage, this.postsListSetting.filter).subscribe((countPages) => {
      this.countOfPages = countPages;
    })
  }
}
