import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {
  CREATE_POST,
  GET_POST,
  GET_POST_PAGES_COUNT,
  GET_POSTS,
  UPDATE_POST
} from "../../common/graphql-types/post-types";
import { Post, PostListSettings } from "../../common/intefraces/post-interfaces";
import { map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private apollo: Apollo
  ) { }

  getPosts(postListSettings: PostListSettings): Observable<Post[]> {
    return this.apollo.query<{ posts: Post[] }>({
      query: GET_POSTS,
      variables: postListSettings
    }).pipe(
      map(item => item.data.posts)
    )
  }

  getPostsPagesCount(perPage: number, filter: Partial<Post>): Observable<number> {
    return this.apollo.query<{getPagesCount : number}>({
      query: GET_POST_PAGES_COUNT,
      variables: { perPage, filter }
    }).pipe(
      map(item => item.data.getPagesCount)
    )
  }

  getPost(id: number): Observable<Post> {
    return this.apollo.query<{post : Post}>({
      query: GET_POST,
      variables: { id }
    }).pipe(
      map(item => item.data.post)
    )
  }

  updatePost(post: Post): Observable<string> {
    return this.apollo.query<string>({
      query: UPDATE_POST,
      variables: { ...post }
    }).pipe(
      map(item => item.data)
    )
  }


  createPost(post: Post): Observable<string> {
    return this.apollo.query<{ createPost: string}>({
      query: CREATE_POST,
      variables: { ...post }
    }).pipe(
      map(item => item.data.createPost)
    )
  }

}
