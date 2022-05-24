import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:CartComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],exports: [RouterModule]
})
export class CartRoutingModule { }
