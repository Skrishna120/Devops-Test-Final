import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { SharedServicesService } from '../shared-services.service';
import { SpinnerService } from '../spinner.service';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-bag',
    templateUrl: './bag.component.html',
    styleUrls: ['./bag.component.css'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        NgClass,
        RouterLink,
    ],
})
export class BagComponent implements OnInit {
  user = { username: '' };
  cart: any;
  inStock = [];
  bool;
  total;
  checkCart: boolean = false;
  deletedProducts = [];
  activeProducts = [];
  sum: number = 0;
  totalPrice: number;
  cartIsEmpty: boolean;
  limitofPurhcase: boolean = false;
  indexRemoved;

  deliveryCharge: number = 50;
  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedServicesService, 
    private spinner: SpinnerService  ) {}

  placeOrder() {
    this.router.navigateByUrl(`useraccount/${this.user.username}/cart/address`);
  }

  removeItemfromCart(item) {
    this.spinner.displayLoad(true);
    this.ds.removeFromCart(item).subscribe(
      (res) => {
        this.spinner.displayLoad(false);

        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.error('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          alert(res['message']);
        } else {
          for (let i = 0; i < this.activeProducts.length; i++)
            if (item.prod_id == this.activeProducts[i].prod_id) {
              this.indexRemoved = i;
            }
          this.activeProducts.splice(this.indexRemoved, 1);
          let userInfo =  this.sharedService.getData();
          userInfo.cartLength-=1;
          this.sharedService.setData(userInfo);
          if (this.activeProducts.length == 0) this.cartIsEmpty = false;
        }
      },
      (err) => {
        this.spinner.displayLoad(false);

      }
    );
  }

  //  move to wish list
  wish(book) {
    this.removeItemfromCart(book);

    let status = localStorage.getItem('username');

    if (status) {
      book.userAdded = status;

      //  console.log(book)
      this.spinner.displayLoad(true);
      this.ds.moveToWishlistFromStore(book).subscribe(
        (res) => {
          this.spinner.displayLoad(false);
          if (res['message'] == 'product added to wishlist') {
            let userInfo =  this.sharedService.getData();
            userInfo.wishlistLength+=1;
            this.sharedService.setData(userInfo);
            this.toastr.success('product added to WishList');
          } else {
            this.toastr.warning('Product is  already exist in wishlist');
          }
        },

        (err) => {
          this.spinner.displayLoad(false);
        }
      );
    } else {
      alert('Please Login or Register ');
    }
  }

  ngOnInit(): void {
    this.user.username = localStorage.getItem('username');
    this.spinner.displayLoad(true);
    this.ds.getCart(this.user).subscribe(
      (res) => {
        this.spinner.displayLoad(false);
        
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          alert('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          alert(res['message']);
        } else {
          this.cart = res['message'];

          for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].active) this.inStock[i] = this.cart[i];
          }

          if (this.cart.length == 0) {
            this.cartIsEmpty = false;
          } else {
            this.cartIsEmpty = true;
          }

          for (let i = 0; i < this.cart.length; i++)
            this.sum = Math.round(this.sum + this.cart[i].prod_price + 1);

          if (this.sum > 1000) {
            this.bool = true;
            this.total = this.sum;
          } else {
            this.bool = false;
            this.total = this.sum + this.deliveryCharge;
          }
        }
      },
      (err) => {
        this.spinner.displayLoad(false);
      }
    );

    setTimeout(() => {
      /*Your Code*/

      this.ds.checkDelete(this.cart).subscribe(
        (res) => {
          if (
            res['message'] == 'Session is Expired.. Please relogin to continue'
          ) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('Usertype');
            this.router.navigateByUrl('/login');
            alert('Session Expired Please relogin');
          }
          if (res['message'] == 'Unauthorized access') {
            alert(res['message']);
          } else {
            let boolean = res['message'];

            for (let k = 0, i = 0; k < boolean.length; i++, k++) {
              if (boolean[k] == 'true') {
                this.activeProducts.push(this.cart[i]);
              } else {
                this.deletedProducts.push(this.cart[i]);

                this.checkCart = true;
              }
            }
          }

          // console.log(this.checkCart)
        },
        (err) => {}
      );
    }, 1100);
  }
}
