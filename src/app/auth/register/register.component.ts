import { Component } from '@angular/core';
import { Step } from 'src/app/core/models/step.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public steps: any = [{ paso: 0, title: 'NÚMERO CELULAR' }, { paso: 1, title: 'DATOS DE CUENTA' },
  { paso: 2, title: 'FINALIZAR' }]
  public progress: Step = this.steps[1];

  constructor() { }

  public stepProgress(event) {
    this.progress = this.steps[event];
  }
}
