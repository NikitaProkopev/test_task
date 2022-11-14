import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges{

  @Input()
  selectedPage: number = 1;

  @Input()
  pagesCount: number = 10;

  @Output()
  changeSelectedPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  selectPage(pageNumber: number): void {
    console.log(pageNumber, 'pageNumber')
    if(pageNumber > 0 && pageNumber <= this.pagesCount) {
      this.changeSelectedPage.emit(pageNumber);
      this.selectedPage = pageNumber;
    }
  }

  get pageNumbersArray() : number[] {
    const result: number[] = [];
    if (this.pagesCount < 10) {
      for(let i = 1; i <= this.pagesCount; i++) {
        result.push(i);
      }
    }
    else {
      if (this.selectedPage < 5) {
        for (let i = 1; i <= 10; i++) {
          result.push(i);
        }
      }
      else if(this.pagesCount - this.selectedPage < 5) {
        for (let i = this.pagesCount - 9; i <= this.pagesCount; i++){
          result.push(i);
        }
      }
      else
      {
        for (let i = this.selectedPage - 4; i <= this.selectedPage + 5; i++) {
          result.push(i);
        }
      }
    }
    return result;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
