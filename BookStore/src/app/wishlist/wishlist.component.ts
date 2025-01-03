import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';
import { SharedServicesService } from '../shared-services.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css'],
    standalone: true,
    imports: [NgIf, NgFor],
})
export class WishlistComponent implements OnInit {
  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private sharedService: SharedServicesService
  ) {}

  wishlist: any;
  wishlistIsEmpty: boolean;
  userObj = { username: '' };
  indexDeleted
  ngOnInit(): void {
    this.userObj.username = localStorage.getItem('username');
    this.spinner.displayLoad(true);
    this.ds.getproductsFromWishlist(this.userObj).subscribe(
      (res) => {
        this.spinner.displayLoad(false);
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.warning('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          this.toastr.warning(res['message']);
        } else {
          this.wishlist = res['message'];

          if (this.wishlist.length == 0) {
            this.wishlistIsEmpty = false;
          } else {
            this.wishlistIsEmpty = true;
          }
        }
      },
      (err) => {
        this.spinner.displayLoad(false);

      }
    );
  }

  deleteFromWishlist(wish) {
    if(this.wishlist.length==0)
    this.wishlistIsEmpty=true
    else
    this.wishlistIsEmpty=false
     for(let i=0 ;i<this.wishlist.length;i++){
       if(wish.prod_id==this.wishlist[i].prod_id){
        this.indexDeleted=i
        break;
       }

       
     }

 this.wishlist.splice(this.indexDeleted,1)
 this.spinner.displayLoad(true);

    this.ds.deleteProductFromWishlist(wish).subscribe(
      (res) => {
        this.spinner.displayLoad(false);
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.warning('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          this.toastr.warning(res['message']);
        } else {
          let userInfo = this.sharedService.getData();
          userInfo.wishlistLength-=1;
          this.sharedService.setData(userInfo)
          this.toastr.success(res['message']);
        }
      },
      (err) => {
        this.spinner.displayLoad(false );
      }
    );

    
    // this.wishlist.splice()
  }

  moveToCartFromWishlist(book) {
    this.spinner.displayLoad(true)
    this.ds.moveToCartFromWishlist(book).subscribe(
      (res) => {
        this.spinner.displayLoad(false)
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.warning('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          this.toastr.warning(res['message']);
        } 
     else if(res['message']==='Product is  already exist in cart'){
      this.toastr.warning(res['message']);
     }
        else {
          let userInfo = this.sharedService.getData();
          userInfo.cartLength+=1;
          userInfo.wishlistLength-=1;
          this.sharedService.setData(userInfo);
          this.toastr.success(res['message']);
        }
      },
      (err) => {
        this.spinner.displayLoad(false)
      }
    );
  }
}
