import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';

import { TestService } from '../service/test.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() time: string;
  private animationTimer: any;
  private questionTimer: any;
  isEnding: boolean = false;
  countDown: string;
  circle: SVGCircleElement;
  radius: number = 0;
  circumference: number = 0;
 
  constructor(private ts: TestService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setDefaults();
    this.initTimer();
  }

  private initTimer(): void {
    let hours = +this.time.split(':')[0];
    let mins  = +this.time.split(':')[1];
    let secs  = +this.time.split(':')[2];
    const duration = (hours * 3600) + (mins * 60) + secs;
    let elapsed = duration;
    
    this.countDown = this.styleCountdown(hours, mins, secs);
    this.setProgress(duration);

    this.questionTimer = setInterval(() => {
      if ((elapsed -= 1) == 0) { 
        this.ts.stopDurationTracker();
        clearInterval(this.questionTimer);
      }
      if (hours > 0) {
        if (mins == 0 && secs == 0) {
          hours -= 1;
          mins = 60;
        }
      }
      mins = secs > 0 ? mins : mins -= 1;
      secs = secs > 0 ? secs -= 1 : 59;

      this.ts.updateDurationTracker(duration - elapsed);
      this.countDown = this.styleCountdown(hours, mins, secs);
      this.isEnding = elapsed > 10 ? false : true; 
    }, 1000);
  }

  private styleCountdown(hours: number, mins: number, secs: number): string {
    let styled = num => num > 9 ? num : `0${num}`;
    return `${styled(hours)}:${styled(mins)}:${styled(secs)}`;
  }

  private setDefaults(): void {
    this.circle = document.querySelector('.outer');
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;

    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
  }

  private setProgress(duration: number): void {
    let counter = duration;
    const offset = percent => {
      return this.circumference - percent / 100 * this.circumference;
    }

    this.circle.style.transition = `stroke-dashoffset ${duration}s linear`;

    this.animationTimer = setInterval(() => {
      if ((counter -= 1) == 0) {
        clearInterval(this.animationTimer);
      }
      let percent = Math.floor((counter / duration) * 100);
      
      this.circle.style.strokeDashoffset = `${offset(percent)}`;
    });
  }

}
