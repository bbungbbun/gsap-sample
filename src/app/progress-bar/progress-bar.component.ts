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
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {

  @ViewChild('progress', {static: true}) progress: ElementRef | any;
  @ViewChild('progressContainer', {static: true}) progressContainer : ElementRef | any;

  initialValue : number = 0;
  endValue : number = 100;
  firstChange : boolean | undefined;

  @Input() loading: boolean | undefined;

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnChanges({ loading } : { loading : SimpleChange }) {
    console.log(loading)

    this.firstChange = loading.firstChange;
    if(loading.firstChange && !this.loading){
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
        this.initialValue++
        gsap.to(this.progressContainer.nativeElement, {
            delay: 0.2,
            duration: 0,
            autoAlpha: 0
        });
        this.cdr.detectChanges();
        setTimeout(start, speed)
      }
    };
    start();
  }

}
