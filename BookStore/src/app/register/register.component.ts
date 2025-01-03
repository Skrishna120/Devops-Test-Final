import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        NgIf,
    ],
})
export class RegisterComponent implements OnInit {
  public types = ['User', 'Admin'];
  myForm: UntypedFormGroup;
  lists = ['User', 'Admin'];
  products = [''];
  validity: boolean = false;
  loginForm!: FormGroup;
  isLoggedin?: boolean;
  constructor(
    private us: DataService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      user: [null, Validators.required],
    });
  }

  status: 'data';
  clickedSubmit(formRef) {
    if (formRef.status) {
      this.validity = true;
      let dataFromForm = formRef.value;
      if (dataFromForm.radioType == 'userChecked') {
        this.us.createUser(dataFromForm).subscribe(
          (res) => {
            if (res['message'] == 'user created') {
              alert(`${res['message']} Successfully `);
              this.router.navigateByUrl('/login');
            } else {
              alert('The email or username is already exist ');
            }
          },
          (err) => {
            alert('Something is wrong while creating');
            console.log(err);
          }
        );
      }
      if (dataFromForm.radioType == 'adminChecked') {
        dataFromForm.products = [];
        console.log('new admin', dataFromForm);

        this.us.createAdmin(dataFromForm).subscribe(
          (res) => {
            if (res['message'] == 'Admin created') {
              alert(`${res['message']} Successfully `);
              this.router.navigateByUrl('/login');
            } else {
              alert('The email or username is already exist ');
            }
          },
          (err) => {
            alert('Something is wrong while creating Admin');
            console.log(err);
          }
        );
      }
    } else {
      this.validity = true;
      this.toastr.warning('All fields are Mandatory');
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailS: ['', Validators.required],
      passwordS: ['', Validators.required],
    });
  }
}
