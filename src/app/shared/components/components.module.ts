import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepProgressComponent } from './step-progress/step-progress.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { ModalSuccessComponent } from './modal-success/modal-success.component';



@NgModule({
  declarations: [
    StepProgressComponent, 
    HeaderComponent,
    ModalComponent,
    ModalSuccessComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [StepProgressComponent, HeaderComponent,ModalSuccessComponent]
})
export class ComponentsModule { }
