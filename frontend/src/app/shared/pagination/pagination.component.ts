import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
@Input() totalCount:number;
@Input() pageSize: number;
@Output() pageChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onPagedChanged(event: any)
  {
    this.pageChanged.emit(event.page);
  }

}
