import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PostsListComponent } from "./post/componentns/posts-list/posts-list.component";
import { PostDetailsComponent } from "./post/componentns/post-details/post-details.component";
import { PostsTableComponent } from "./post/componentns/posts-table/posts-table.component";
import { PostsFilterComponent } from "./post/componentns/posts-filter/posts-filter.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "./common/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import {LoginModule} from "./login/login.module";

@NgModule({
  declarations: [
    AppComponent,
    PostsTableComponent,
    PostsFilterComponent,
    PostsListComponent,
    PostDetailsComponent,
  ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        GraphQLModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        LoginModule,
    ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
