import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {Subscription, tap} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit, OnDestroy {
  public products: ProductType[] = [];
  private subscription: Subscription | null = null;
  private subscriptionSearch: Subscription | null = null;
  public loading: boolean = false;
  public emptyProducts: boolean = false;
  public pageTitle: string = "Наши чайные коллекции";

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.getProducts(this.productService.searchValue);
    this.getPageTitle(this.productService.searchValue);

    this.subscriptionSearch = this.productService.subjectSearch.subscribe(search => {
      this.getPageTitle(search);
      this.getProducts(search);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionSearch?.unsubscribe();
  }

  getProducts(search?: string): void {
    this.emptyProducts = false;
    this.subscription = this.productService.getProducts(search)
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (products: ProductType[]) => {
          this.products = products;
          if (this.products.length === 0) {
            this.emptyProducts = true;
          }
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['']).then();
        }
      });
  }

  getPageTitle(search?: string): void {
    if (search) {
      this.pageTitle = `Результаты поиска по запросу "${search}"`;
    } else {
      this.pageTitle = "Наши чайные коллекции";
    }
  }
}
