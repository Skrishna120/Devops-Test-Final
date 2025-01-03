import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';
import { SharedServicesService } from '../shared-services.service';

@Component({
    selector: 'app-productinfo',
    templateUrl: './productinfo.component.html',
    styleUrls: ['./productinfo.component.css'],
    standalone: true,
    imports: [RouterLink],
})
export class ProductinfoComponent implements OnInit {
  productid;
  prodobj = { id: Number };
  product;
  clickedCard;
  constructor(
    private ar: ActivatedRoute,
    private ds: DataService,
    private toastr: ToastrService,
    private router :Router,
    private spinner: SpinnerService,
    private persistence: PersistenceService,
    private sharedService: SharedServicesService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.clickedCard = this.persistence.get('CARD_CLICKED',StorageType.SESSION);
    this.spinner.displayLoad(true);
    this.ar.paramMap.subscribe((data) => {
      this.productid = data['params'].id;
    });
    this.prodobj.id = this.productid;
    this.ds.getProductwithid(this.prodobj).subscribe(
      (res) => {
        this.product = res['message'];
        this.spinner.displayLoad(false);
        this.spinner.displayLoad(false);
      },
      (err) => {
        this.spinner.displayLoad(false);

      }
    );
  }

  clickedCart(book) {
    let status = localStorage.getItem('username');
    this.spinner.displayLoad(true);

    if (status) {
      book.userAdded = status;

      this.ds.addtoCart(book).subscribe(
        (res) => {
          if (res['message'] == 'product added to cart') {
           let userInfo=  this.sharedService.getData();
           userInfo.cartLength+=1;
           this.sharedService.setData(userInfo);
           this.spinner.displayLoad(false);
           this.toastr.success('product added successfully'); 
          } else {
            // this.toastr.warning("Product is already exist in cart")
            this.spinner.displayLoad(false);
            this.toastr.warning('Product is already exist in cart');
          }
        },
        (err) => {
          this.spinner.displayLoad(false);
        }
      );
    } else {
      this.toastr.error('Please  Login ');
      setTimeout( () => {
        this.spinner.displayLoad(false);

        this.router.navigateByUrl('/login')}, 1000 );
      
    }
  }

  clickedWishlist(book) {
    let status = localStorage.getItem('username');
    this.spinner.displayLoad(true);
    if (status) {
      book.userAdded = status;

      //  console.log(book)

      this.ds.moveToWishlistFromStore(book).subscribe(
        (res) => {
          // console.log(res['message']);
          this.spinner.displayLoad(false);
          if (res['message'] == 'product added to wishlist') {
            
            let userInfo=  this.sharedService.getData();
            userInfo.wishlistLength+=1;
            this.sharedService.setData(userInfo);

            this.toastr.success('product added to WishList');
          } else {
            this.toastr.warning('Product is  already exist in wishlist');
          }
        },

        (err) => {}
      );
    } else {
      this.toastr.warning('Please  Login ');
      this.router.navigateByUrl('/login')
    }
  }
}
