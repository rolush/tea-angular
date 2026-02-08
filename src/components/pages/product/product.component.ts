import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductComponent implements OnInit {
  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id']).subscribe({
          next: (data: ProductType) => {
            this.product = data;
          },
          error: () => {
            this.router.navigate(['/']).then();
          }
        });
      }
    });
  }
}
