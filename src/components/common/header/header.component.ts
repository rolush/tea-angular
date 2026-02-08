import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule]
})
export class HeaderComponent {
  public searchValue: FormControl<string | null> = new FormControl('');

  constructor(private router: Router,
              private productService: ProductService) {
  }

  search() {
    this.router.navigate(['/products']).then();
    if (this.searchValue.value) {
      this.productService.changeSearch(this.searchValue.value);
    } else {
      this.productService.changeSearch('');
    }
  }
}
