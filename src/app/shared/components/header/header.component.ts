import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/step.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  @Input() data:Step;
  @Output() back = new EventEmitter<number>();

  constructor(private router: Router) { }

  ngOnInit() {}

  backButton(){
    if(this.data.paso==0){
      this.router.navigate(['/'])
    }
    else{
      let paso = this.data.paso -1
      this.back.emit(paso);
    }
       
  }

}
