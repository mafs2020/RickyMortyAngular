/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    private title: Title,
    private router: Router
  ) {
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      tap(da => console.log(da))
    ).
    subscribe(next => console.log(next), err => console.log(err), () => console.log('always'));
  }

  ngOnInit(): void {
    this.title.setTitle('Rick and Morty');
  }

}
