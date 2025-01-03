import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parse } from 'dotenv'
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css'],
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class PaymentComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  total;
  x;
  str: any;
  deliveryCharge;
  sum;
  bool;
  otp: number;
  incorrectOtp: boolean = false;
  validity: boolean = false;
  savedCards: any;
  displayAddCard: boolean = true;
  cardLimitReached: boolean = false;
  cardDetails = [{ username: '', card: '', displayName: '' }];
  otpReceived: boolean = false;
  orders = [{ selectedAddress: '', orderBy: '', status: '' }];

  cardIndex = { index: '', username: '', cardObj: [] };

  cardSelected: boolean = false;
  selectedCardFromRadio: any;
  // addAddress(ref) {
  //   console.log(ref.status);
  //   if (ref.status == 'VALID') {
  //     console.log(ref.value);
  //     this.validity = true;
  //    }

  //   else {
  //     this.validity = false;
  //   }
  // }

  selectedCard(card) {
    this.cardSelected = true;

    this.selectedCardFromRadio = this.cardSelected;
  }

  deleteCard(deletedIndex) {
    this.cardIndex.index = deletedIndex;
    this.cardIndex.username = localStorage.getItem('username');

    this.savedCards.splice(deletedIndex, 1);

    this.cardIndex.cardObj = this.savedCards;

    if (this.savedCards.length < 3) this.displayAddCard = true;

    this.ds.deleteCard(this.cardIndex).subscribe(
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
          if (res['message'] == 'Card deleted')
            this.toastr.success(res['message']);
        }
      },
      (err) => {}
    );
  }

  makePayment() {
    let user = { username: localStorage.getItem('username') };

    // console.log(user)

    this.ds.makePaymentFinal(user).subscribe(
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
            this.otp = res['message'];

            this.otpReceived = true;
            alert(this.otp);
          }
        }
      },
      (err) => {}
    );
  }

  confirmed: boolean = true;
  confirmOtp(formOtp) {
    let user = { username: localStorage.getItem('username') };

    let confirmOtps = formOtp.value.otp;

    if (this.otp == confirmOtps) {
      this.orders[0].status = 'success';
      this.orders[0].orderBy = localStorage.getItem('username');

      let receivedAddress = this.ds.receiveFinalAddress();
      this.orders[0].selectedAddress = receivedAddress;

      this.ds.makePaymentFinalStep(this.orders).subscribe(
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
          }

          // orders list  of user
          // admin profile sales
        },
        (err) => {}
      );

      this.router.navigateByUrl('thanks');
    } else {
      this.orders[0].status = 'failed';
      this.orders[0].orderBy = localStorage.getItem('username');

      this.incorrectOtp = true;
    }
  }
  cardSave(ref) {
    let cardObj = ref.value;
    // console.log(cardObj)
    this.closebutton.nativeElement.click();
    let user = localStorage.getItem('username');

    this.cardDetails[0].username = user;
    this.cardDetails[0].card = cardObj;

    let str = cardObj.cHname + '-' + (parseInt(cardObj.cNumber) % 10000);

    this.cardDetails[0].displayName = str;

    this.ds.cardSave(this.cardDetails).subscribe(
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
          if (res['message'] == 'Card Added') {
            this.cardLimitReached = false;
            this.x = 'modal';

            // this.router.navigateByUrl('/home')
            this.savedCards.push(this.cardDetails[0]);
            //  console.log( this.savedCards.length)

            if (this.savedCards.length >= 3) this.displayAddCard = false;
          } else {
            this.cardLimitReached = true;
          }
        }
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    let user = localStorage.getItem('username');

    this.cardDetails[0].username = user;

    this.ds.getCards(this.cardDetails).subscribe(
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
          this.savedCards = res['message'];

          if (this.savedCards.length <= 2) {
            this.displayAddCard = true;
          } else {
            this.displayAddCard = false;
          }
        }
      },
      (err) => {}
    );
  }
}
