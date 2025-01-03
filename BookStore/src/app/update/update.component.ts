import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css'],
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class UpdateComponent implements OnInit {
  dataFromServer = [];

  public inputName: string = '';
  save: boolean = false;
  editIcon: boolean = !this.save;
  sum: number;

  indexClicked: number;
  localUser = { username: '' };
  delUser = { prodIdDel: '' };

  constructor(private ds: DataService, private router: Router,private toastr: ToastrService) {
    this.localUser.username = localStorage.getItem('username');
    //  console.log("bloody",this.localUser)

    this.ds.getProducts(this.localUser).subscribe(
      (res) => {
        this.dataFromServer = res['message'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  identifyProducId(index) {
    this.indexClicked = index;
  }

  deleteProduct(index) {
    console.log(index);  

    this.delUser.prodIdDel = index
    this.ds.deleteAdminProducts(this.delUser).subscribe(
      (res) => {
        console.log(res['message']);

      
      },
      (err) => {
        console.log('error at delete ', err);
      }
    );
  }

  saveData(data) {
    // document.querySelectorAll(".name")[index].innerHTML=document.querySelectorAll('.ch_name')[index].value

    let adminReqData = data.value;
    adminReqData.prod_id = this.dataFromServer[this.indexClicked].prod_id;
    console.log(adminReqData);
    this.ds.updateAdminProducts(adminReqData).subscribe(
      (res) => {
      this.toastr.success( res['message']);

            
      },
      (err) => {}
    );
  }
}
