import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public subjectSearch: Subject<string>;
  public searchValue: string = '';

  constructor(private http: HttpClient) {
    this.subjectSearch = new Subject<string>();
  }

  public changeSearch(search: string): void {
    this.searchValue = search;
    this.subjectSearch.next(search);
  }

  getProducts(search?: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.API_URL + 'tea')
      .pipe(
        map((products: ProductType[]) => {
        if (search) {
          const searchLower = search.toLowerCase();
          return products.filter(product =>
            product.title.toLowerCase().includes(searchLower)
          );
        }
        return products;
      })
    );
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.API_URL + `tea?id=${id}`);
  }
}
