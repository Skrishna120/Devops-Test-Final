import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-adminprofile',
    templateUrl: './adminprofile.component.html',
    styleUrls: ['./adminprofile.component.css'],
    standalone: true,
    imports: [UpperCasePipe],
})
export class AdminprofileComponent implements OnInit {
  username: string;
  constructor() {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {}
}
