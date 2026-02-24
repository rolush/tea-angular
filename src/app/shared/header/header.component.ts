import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  public searchValue: FormControl<string | null> = new FormControl('');
  public isMenuCollapsed = true;

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
