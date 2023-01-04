import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loading : boolean = false;
  loadingSecond : boolean = false;
  loadingThird : boolean = false;

  constructor() {
  }


  ngOnInit(){
    // just for testing that progress bar actually working

    timer(1000).subscribe((_)=>(this.loading = true))
    timer(3000).subscribe((_)=>(this.loading = false))

    timer(4000).subscribe((_)=>(this.loading = true))
    timer(6000).subscribe((_)=>(this.loading = false))

    timer(7000).subscribe((_)=>(this.loading = true))
    timer(9000).subscribe((_)=>(this.loading = false))
  }

}
