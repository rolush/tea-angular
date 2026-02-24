import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, Subscription, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";
import {OrderType} from "../../../types/order.type";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})

export class OrderComponent implements OnInit, OnDestroy {
  public checkoutForm = this.fb.group({
    product: [{value: '', disabled: true}],
    name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-ЯЁа-яё]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[A-Za-zА-ЯЁа-яё]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern('^[\\d]{6}$')]],
    address: ['', [Validators.required, Validators.pattern('^[A-Za-zА-ЯЁа-яё\\s\\-\\/\\d]+$')]],
    comment: ['']
  });

  private subscription: Subscription | null = null;
  private subscriptionError: Subscription | null = null;
  private observable: Observable<boolean>;
  public isSuccess: boolean = false;
  public hasError: boolean = false;
  public disabled: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {
    this.observable = new Observable(observer => {
      const timeout = setTimeout(() => {
        observer.next(false);
      }, 3000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    });
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.checkoutForm.patchValue({product: params['product']});
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionError?.unsubscribe();
  }

  public createOrder(): void {
    if (this.checkoutForm.valid) {
      const data: OrderType = {
        name: this.checkoutForm.get('name')!.value!,
        last_name: this.checkoutForm.get('lastName')!.value!,
        phone: this.checkoutForm.get('phone')!.value!,
        country: this.checkoutForm.get('country')!.value!,
        zip: this.checkoutForm.get('zip')!.value!,
        product: this.checkoutForm.get('product')!.value!,
        address: this.checkoutForm.get('address')!.value!,
        comment: this.checkoutForm.get('comment')!.value!
      };
      this.disabled = true;

      this.orderService.createOrder(data)
        .pipe(
          tap(() => {
            this.disabled = false;
          })
        ).subscribe({
        next: (response) => {
          if (response.success === 1) {
            this.isSuccess = true;
            this.hasError = false;
          } else {
            this.isSuccess = false;
            this.hasError = true;
            this.subscriptionError = this.observable.subscribe((param: boolean) => this.hasError = param);
          }
        },
        error: () => {
          this.isSuccess = false;
          this.hasError = true;
          this.subscriptionError = this.observable.subscribe((param: boolean) => this.hasError = param);
        }
      });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
