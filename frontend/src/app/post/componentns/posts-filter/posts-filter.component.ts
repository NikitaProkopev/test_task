import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import Timeout = NodeJS.Timeout;
import {Post} from "../../../common/intefraces/post-interfaces";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null),
    description: new FormControl(null),
    createDate: new FormControl(null),
    author: new FormControl(null),
    categories: new FormControl(null)
  });

  categoriesList: {id: number, name: string}[] = [];
  selectedCategoriesList: string[] = [];

  @Output()
  updatePost: EventEmitter<Partial<Post>> = new EventEmitter<Partial<Post>>();

  isDisplayCategories: boolean = false;

  private onFormStopChanging?: Timeout;
  private onCategoriesStopChanging?: Timeout;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories('', this.selectedCategoriesList).subscribe((categories) => {
      this.categoriesList = categories;
    })
    this.form.valueChanges.subscribe((value) => {
      if(value.categories === null || value.categories == '') {
        this.updatePostsTimeout();
      } else {
        this.updateCategoriesTimeout();
      }
    })
  }

  changeCategoriesListState(state: boolean) {
    this.isDisplayCategories = state;
  }

  removeCategories(category: number) {
    if(this.selectedCategoriesList.length === 1) {
      this.selectedCategoriesList = [];
    } else {
      this.selectedCategoriesList.splice(category, 1);
    }
    this.getAndSaveCategories();
    this.changeCategoriesListState(false);
    this.updatePostsTimeout();
  }

  addCategoryToList(category: string) {
    console.log(category, 'category');
    this.selectedCategoriesList.push(category);
    this.getAndSaveCategories();
    this.changeCategoriesListState(false);
    this.updatePostsTimeout();
  }

  blurCategoriesList() {
    setTimeout(() => {
      this.changeCategoriesListState(false)
    }, 100)
  }

  private updatePostsTimeout() {
    clearTimeout(this.onFormStopChanging);
    this.onFormStopChanging = setTimeout(() => {
      let updateData = this.form.value;
      if (this.selectedCategoriesList.length === 0){
        updateData.categories = null;
      } else {
        updateData.categories = this.selectedCategoriesList;
      }
      this.updatePost.emit(updateData);
    }, 1000);
  }

  private updateCategoriesTimeout() {
    clearTimeout(this.onCategoriesStopChanging);
    this.onCategoriesStopChanging = setTimeout(() => {
      this.getAndSaveCategories();
    }, 500);
  }

  private getAndSaveCategories() {
    let name = this.form.controls['categories'].value ? this.form.controls['categories'].value : '';
    this.categoryService.getCategories(name, this.selectedCategoriesList).subscribe((categories) => {
      this.categoriesList = categories;
    })
  }
}
