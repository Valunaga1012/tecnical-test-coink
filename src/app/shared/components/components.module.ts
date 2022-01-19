import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash/splash.component';
import { StepProgressComponent } from './step-progress/step-progress.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { ModalSuccessComponent } from './modal-success/modal-success.component';



@NgModule({
  declarations: [
    SplashComponent, 
    StepProgressComponent, 
    HeaderComponent,
    ModalComponent,
    ModalSuccessComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SplashComponent, StepProgressComponent, HeaderComponent,ModalSuccessComponent]
})
export class ComponentsModule { }
