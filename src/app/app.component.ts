import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Application, Sprite, filters } from 'pixi.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'pixi-me';
  app: Application;
  displacementFilter: filters.DisplacementFilter;
  @ViewChild('img', { static: false }) imgContainer: ElementRef;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.displacementFilter.scale.x = (this.imgContainer.nativeElement.clientWidth / 2 - e.clientX) / 40;
    this.displacementFilter.scale.y = (this.imgContainer.nativeElement.clientHeight / 2 - e.clientY) / 40;
  }
  constructor(private ele: ElementRef) {
    //this.app = new Application({ width: window.innerWidth, height: window.innerHeight });


  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.app = new Application({ width: this.imgContainer.nativeElement.clientHeight*0.9661016949152542, height: this.imgContainer.nativeElement.clientHeight });
    this.imgContainer.nativeElement.appendChild(this.app.view);
    const img = Sprite.from('/assets/sprites/me.png');
    img.width = this.imgContainer.nativeElement.clientHeight*0.9661016949152542;
    img.height = this.imgContainer.nativeElement.clientHeight;
    this.app.stage.addChild(img);
    const depthMap = Sprite.from('/assets/sprites/me-depth.png');
    depthMap.width =  img.width = this.imgContainer.nativeElement.clientHeight*0.9661016949152542;
    depthMap.height = this.imgContainer.nativeElement.clientHeight;
    this.app.stage.addChild(depthMap);
    this.displacementFilter = new filters.DisplacementFilter(depthMap);
    this.app.stage.filters = [this.displacementFilter];
  }

}

