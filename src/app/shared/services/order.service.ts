import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {OrderType} from "../../../types/order.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  constructor(private http: HttpClient) { }

  createOrder(data: OrderType): Observable<{ success: number, message?: string }> {
    return this.http.post<{ success: number, message?: string }>(environment.API_URL + 'order-tea', data);
  }
}
