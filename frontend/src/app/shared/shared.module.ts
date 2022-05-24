import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule,PagingHeaderComponent,PaginationComponent,OrderTotalsComponent]
})
export class SharedModule { }
