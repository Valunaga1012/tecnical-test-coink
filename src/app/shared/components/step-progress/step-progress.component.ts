import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.scss'],
})
export class StepProgressComponent implements OnInit {

  @Input() paso: number;
  color: string = '#1EEB00'
  color2: string ='#D3D3D3'
  constructor() { }

  ngOnInit() {}

}
