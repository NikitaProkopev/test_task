import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { map, Observable} from "rxjs";
import {GET_CATEGORIES} from "../../common/graphql-types/category-types";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private apollo: Apollo
  ) { }

  getCategories(name: string, notInclude: string[]): Observable<{id: number, name: string}[]> {
    return this.apollo.query<{ categories: {id: number, name: string}[] }>({
      query: GET_CATEGORIES,
      variables: { name, notInclude }
    }).pipe(
      map(item => item.data.categories)
    )
  }

}
