import { Component,Output,EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ModalSuccessComponent } from 'src/app/shared/components/modal-success/modal-success.component';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss'],
})
export class PasoTresComponent {

  @Output() paso = new EventEmitter<number>();
  public oinkImg:string ="assets/img/OinkPolicia.svg";
  public check = { isChecked: false };
  public isChecked: boolean = false;

  constructor(
    public modalController: ModalController, 
    private localStorage: LocalStorageService
    ) { }

  public isCheck(): void {
    this.isChecked = this.check.isChecked
  }
  
  public next(): void {
    console.log(this.localStorage.getItem('DATA'));
    this.createModal();
  }

  private async createModal(): Promise<void> {
    const popover: HTMLIonModalElement =
      await this.modalController.create({
        component: ModalSuccessComponent,
        cssClass: 'modal-success',
        componentProps: {
          isImg: true,
          isClose: false,
          img: 'assets/img/marrano-regalo.svg',
          header: '¡Bienvenido a Coink!',
          body: '¡Cuenta creada exitosamente, tu marrano ya está listo para que empieces a ahorrar!',
          footer: 'CONTINUAR'
        }
      });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    
  }
}
