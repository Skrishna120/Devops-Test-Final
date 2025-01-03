import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admindash',
    templateUrl: './admindash.component.html',
    styleUrls: ['./admindash.component.css'],
    standalone: true,
    imports: [RouterLink, RouterOutlet],
})
export class AdmindashComponent implements OnInit {
  constructor(private ar: ActivatedRoute) {}

  adminName: string;
  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.adminName = data['param'];
    });
  }
}
