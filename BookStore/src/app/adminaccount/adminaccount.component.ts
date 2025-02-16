import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-adminaccount',
    templateUrl: './adminaccount.component.html',
    styleUrls: ['./adminaccount.component.css'],
    standalone: true,
    imports: [
        NgClass,
        RouterLink,
        RouterOutlet,
    ],
})
export class AdminaccountComponent implements OnInit {
  status: boolean = false;
  adminName: string;

  constructor(private ar: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.adminName = data['param'];
    });
  }

  toggleMenu() {
    this.status = !this.status;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login');
  }
}
