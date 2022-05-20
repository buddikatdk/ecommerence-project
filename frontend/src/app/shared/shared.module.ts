import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule,PagingHeaderComponent,PaginationComponent]
})
export class SharedModule { }
