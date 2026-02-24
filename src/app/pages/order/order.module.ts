import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {OrderComponent} from "./order.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    OrderRoutingModule
  ],
  exports: [
    OrderRoutingModule
  ]
})

export class OrderModule { }
