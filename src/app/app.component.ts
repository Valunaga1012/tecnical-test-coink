import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  splash:boolean = false;
  constructor() {}
  ngOnInit(): void {
      setTimeout(() => {
        this.splash =true
      }, 2000);
  }
}
