import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.scss'],
})
export class ModalSuccessComponent implements OnInit {

  @Input() header:string;
  @Input() body: string;
  @Input() footer: string;
  @Input() img: string;
  @Input() color: string;
  @Input() isClose: boolean = true;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public dismiss(): void {
    this.modalController.dismiss({
      status: true
    });
  }
}
