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
    // 페이지 로딩 후 1초 뒤에 this.loading = true 적용
    timer(3000).subscribe((_)=>(this.loading = false))
    // 페이지 로딩 후 3초 뒤에 this.loading = false 적용

    timer(4000).subscribe((_)=>(this.loading = true))
    timer(6000).subscribe((_)=>(this.loading = false))

    timer(7000).subscribe((_)=>(this.loading = true))
    timer(9000).subscribe((_)=>(this.loading = false))
  }

}
