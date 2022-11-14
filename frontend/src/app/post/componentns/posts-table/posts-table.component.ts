import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Post, PostListSettings } from "../../../common/intefraces/post-interfaces";
import { Router } from "@angular/router";
import {AuthService} from "../../../common/services/auth.service";

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsTableComponent {

  @Input()
  postList?: Post[];

  @Input()
  pagesCount: number = 0;

  @Input()
  postListSettings: PostListSettings = { page: 1, perPage: 10, filter: {} }

  @Output()
  updatePostsList: EventEmitter<PostListSettings> = new EventEmitter<PostListSettings>();

  constructor(
    private router: Router,
  ) {
  }


  onSelectedPageChanged(pageNumber: number): void {
    this.postListSettings.page = pageNumber;
    this.updatePostsList.emit(this.postListSettings)
  }

  orderByClick(typeUpdating: string) {
    if (typeUpdating == this.postListSettings.orderFieldName && this.postListSettings.orderTypeName === 'ASC') {
      this.postListSettings.orderTypeName = 'DESC';
    } else {
      this.postListSettings.orderTypeName = 'ASC';
    }
    this.postListSettings.orderFieldName = typeUpdating;
    this.postListSettings.page = 1;
    this.updatePostsList.emit(this.postListSettings);
  }

  navigateToPostDetails(id: number) {
    this.router.navigate(['post', id])
  }

  navigateToAddPost() {
    this.router.navigate(['add-post'])
  }

}
