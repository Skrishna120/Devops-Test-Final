import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-adventure',
    templateUrl: './adventure.component.html',
    styleUrls: ['./adventure.component.css'],
    standalone: true,
    imports: [NgFor],
})
export class AdventureComponent implements OnInit {
  booksAvailable: Array<any>;
  adventureBooks: Array<any>;

  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.ds.getAllProductstoUsers().subscribe(
      (res) => {
        this.booksAvailable = res['message'];

        this.adventureBooks = this.booksAvailable.filter((book) => {
          book.type == 'Adventure';

          return book;
        });
      },
      (err) => {}
    );
  }
}
