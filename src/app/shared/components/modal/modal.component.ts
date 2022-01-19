import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() header:string;
  @Input() body: string;
  @Input() footer: string;
  @Input() img: string;
  @Input() isImg: boolean = false;
  @Input() color: string;
  @Input() isClose: boolean = true;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public dismiss(state): void {
    this.modalController.dismiss({
      status: true,
      data: state
    });

  }

}
