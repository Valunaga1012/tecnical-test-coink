import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepProgressComponent } from './step-progress/step-progress.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { PadNumberComponent } from './pad-number/pad-number.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StepProgressComponent, 
    HeaderComponent,
    ModalComponent,
    ModalSuccessComponent,
    PadNumberComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [StepProgressComponent, HeaderComponent,ModalSuccessComponent,PadNumberComponent]
})
export class ComponentsModule { }
