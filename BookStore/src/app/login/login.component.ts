import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';
import { PersistenceService, StorageType } from 'angular-persistence';
import { SharedServicesService } from '../shared-services.service';
import { NgFor } from '@angular/common';
declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgFor,
        RouterLink,
    ],
})
export class LoginComponent implements OnInit {
  lists = ['User', 'Admin'];
  loginCheck: Boolean = false;
  isFormSubmitted = false;
  toastMessage: String = ' ';

  subscription: Subscription;
  loginObj;
  loginStatus: boolean = localStorage.getItem('email') ? true : false;

  constructor(
    private us: DataService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private sharedServies: SharedServicesService,
    private persistenceService: PersistenceService
  ) {}
  form;
  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      User: new UntypedFormControl(false),
      //  Admin:new FormControl(false),
    });
  }

  loginData() {
    this.loginObj = this.form.value;

    if (this.loginObj.User == null) {
      this.toastr.error('Please select Type of Login');
    } else {
      if (this.loginObj.User == 'User') {
        this.userLogin();
      }

      if (this.loginObj.User == 'Admin') {
        this.adminLogin();
      }
    }
  }

  userLogin() {
    // this.spinner.displayLoad(true);
    this.subscription = this.us.loginUser(this.loginObj).subscribe(
      (res) => {
        if (res['message'] == 'success') {
          this.toastr.success("Successfull logged In!'");
          localStorage.setItem('token', res['token']);
          this.loginStatus = true;
          localStorage.setItem('email', res['userObj']);
          localStorage.setItem('Usertype', this.loginObj.User);
          this.loginCheck = true;
          this.us.sendloginState(this.loginStatus);
          let userInfo = {
            cartLength: res['cartLength'],
            wishlistLength: res['wishlistLength'],
          };

          this.persistenceService.set('userInfo', userInfo, {
            type: StorageType.SESSION,
          });
          this.sharedServies.setData(userInfo);
          this.router.navigateByUrl(`/useraccount/${this.loginObj.email}`);
        }

        if (res['message'] == 'Invalid username') {
          // alert('Username is not valid Please Register');

          this.toastr.error('Username is not valid Please Register');

          // this.router.navigateByUrl('/register');
        }
        if (res['message'] == 'Invalid Password') {
          this.toastr.error('Incorrect  Password');
        }
      },

      (err) => {
        this.spinner.displayLoad(false);
        this.toastr.error('Maintainance issue');
      }
    );
  }

  adminLogin() {
    this.us.loginAdmin(this.loginObj).subscribe(
      (res) => {
        // console.log(res['message']);

        if (res['message'] == 'success') {
          this.toastr.success('Login Success');

          this.router.navigateByUrl(`/adminaccount/${this.loginObj.email}`);

          localStorage.setItem('token', res['token']);
          localStorage.setItem('username', res['adminObj']);
          localStorage.setItem('Usertype', this.loginObj.User);

          this.loginStatus = true;
          this.us.sendloginState(this.loginStatus);
        }

        if (res['message'] == 'Invalid username') {
          this.toastr.error('Username is not valid Please Register');
        }

        if (res['message'] == 'Invalid Password') {
          this.toastr.error('Incorrect  Password');
        }
      },

      (err) => {}
    );
  }

  redirectRegister() {
    this.router.navigateByUrl('/register');
  }
}
