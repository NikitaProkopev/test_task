import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { PostService } from "../../services/post-service.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Post} from "../../../common/intefraces/post-interfaces";
import {pairwise} from "rxjs";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  isAddPost: boolean = false;
  isEditPost: boolean = false;
  post?: Post;
  postCategories: string[] = [];

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    imgByLink: new FormControl(''),
    imgByFile: new FormControl(''),
    img: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    createDate: new FormControl('', [Validators.required,
      Validators.pattern(/(0\d|[0-3]\d)\.(0\d|1[0-2])\.\d{4} (0\d|1[0-2]):[0-5]\d:[0-5]\d (PM|AM)/gm)]),
    //
    categories: new FormControl('', Validators.required),
    categoriesText: new FormControl(''),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params) {
        const id = params.get('id');
        console.log(id, 'id');
        if (id) {
          this.postService.getPost(+id).subscribe((post) => {
            this.post = post;
            this.updateFormByPost();
          })
        } else {
          this.isAddPost = true;
        }
      }
    });
    this.form.valueChanges.pipe(pairwise()).subscribe(([preValue, value]) => {
      console.log(this.form.controls);
      if ((value.imgByFile && value.imgByFile !== preValue.imgByFile ) ||
        (value.imgByLink && value.imgByLink !== preValue.imgByLink)) {
        this.form.patchValue({
          img: value.imgByFile ? value.imgByFile: value.imgByLink
        });
      }
      if (value.categoriesText &&
        value.categoriesText.length > 1 &&
        value.categoriesText.slice(-1) == ' ') {
        this.postCategories.push(value.categoriesText.slice(0, value.categoriesText.length - 1))
        this.form.patchValue({
          categoriesText: '',
          categories: this.postCategories
        })
      }
    })
    console.log(this.form);
  }

  addNewImg(imgInput: HTMLInputElement): void {
    if(imgInput.files && imgInput.files[0] && this.form.controls['imgByFile'].value) {
      console.log(imgInput.files)
      let img: File = imgInput.files[0];
      let reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        console.log(e.target?.result);
        if(e && e.target && e.target.result && typeof e.target.result === "string") {
          this.form.patchValue({
            img: e.target.result
          });
        }
      };
      reader.readAsDataURL(img);
    } else {
      this.form.patchValue( {
        img: undefined
      });
    }
  }

  cancelChanges(): void {
    if (this.isAddPost) {
      this.navigateToMain();
    } else {
      this.isEditPost = false;
      this.updateFormByPost();
    }
  }

  deleteImg(): void {
    this.form.patchValue({
      imgByLink: '',
      imgByFile: '',
      img: ''
    })
  }

  removeCategories(category: number) {
    if(this.postCategories.length === 1) {
      this.postCategories = [];
    } else {
      this.postCategories.splice(category, 1);
    }
    this.form.patchValue({
      categories:  this.postCategories.join(',')
    })
  }

  clearAllCategories() {
    this.postCategories = [];
    this.form.patchValue({
      categories: ''
    })
  }

  savePostChanges(): void {
    const formValues = this.form.value;
    let img = `<img src="${formValues.img}">`
    const preparedPost: Post = {
      id: 0,
      title: formValues.title,
      text: formValues.text,
      img: img,
      categories: this.postCategories,
      author: formValues.author,
      createDate: formValues.createDate,
    }
    if (this.post && this.isEditPost) {
      preparedPost.id = this.post.id;
      this.postService.updatePost(preparedPost).subscribe(
        (res) => {
          alert(res)
        },
        (err) => {
          alert(err.message);
        })
    } else {
      this.postService.createPost(preparedPost).subscribe(
        (result) => {alert(result)},
        (err) => {console.log(err)}
      )
      console.log('add post');
    }
  }

  navigateToMain(){
    this.router.navigate(['/posts']);
  }

  private getLinkFromImgTag(): string {
    if(this.post?.img) {
      return [...this.post.img.matchAll(/img src="(.*?)".*?\/?>/gm)][0][1];
    } else {
      return '';
    }
  }

  private updateFormByPost(): void {
    if(this.post) {
      let imgLink = this.getLinkFromImgTag();
      if(typeof this.post.categories === "string")
      {
        this.postCategories = this.post.categories.split(',');
      }
      this.form.patchValue({
        title: this.post.title,
        imgByLink: imgLink,
        img: imgLink,
        text: this.post.text,
        author: this.post.author,
        createDate: this.post.createDate,
        categories: this.post.categories
      })
    }
  }

}
