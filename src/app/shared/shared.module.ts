import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductDescriptionPipe} from "./pipes/product-description.pipe";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ProductDescriptionPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbCollapseModule
  ],
  exports: [
    ProductDescriptionPipe,
    RouterModule,
    ReactiveFormsModule,
    NgbCollapseModule
  ]
})

export class SharedModule { }
