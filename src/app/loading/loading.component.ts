import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChange
} from '@angular/core';
import { gsap } from 'gsap';
import {delay} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnChanges{

  @ViewChild('progress', {static: true}) progress: ElementRef | any;
  @ViewChild('progressContainer', {static: true}) progressContainer : ElementRef | any;

  initialValue : number = 0;
  endValue : number = 100;
  firstChange : boolean | undefined;

  @Input() loading: boolean | undefined;
  @Input() showProgress : boolean | undefined;
  @Input() barSize : string | undefined;


  constructor(private cdr: ChangeDetectorRef) { }


  ngOnChanges({ loading } : { loading : SimpleChange }) {
    console.log(loading);

    this.firstChange = loading.firstChange;
    if(this.firstChange && !this.loading){
      return;
    } else{
      if(this.loading !== undefined){
        if(this.initialValue === this.endValue){
          this.initialValue = 0;
          gsap.to(this.progressContainer.nativeElement,{
            duration: 0,
            autoAlpha: 1
          })
        }
        this.animateProgress(this.loading);
      }
    }
  }

  setBarSize(){
    return {
      height: `${this.barSize}`,
    }
  }

  private animateProgress(loading: boolean):void{
    const start = () =>{
      let speed = 90;
      if(this.initialValue < this.endValue){
        if( loading && this.initialValue === 95){
          return;
        }
        if(!loading){
          speed = 5
        }
        this.initialValue++;
        gsap.to(this.progress.nativeElement,{
          width: `${this.initialValue}%`
        });
        if(this.initialValue === this.endValue && !loading){
          gsap.to(this.progressContainer.nativeElement, {
            delay: 0.2,
            duration: 0.5, // 투명해지는 애니메이션 적용시간
            autoAlpha: 0 // opacity와 동일
          });
        }
        this.cdr.detectChanges();
        setTimeout(start, speed);
        /*  setTimeout(function, delay)
        함수를 일정시간 뒤에 실행시키고 싶은 경우에 사용
         */
      }
    };
    start();
  }

}
