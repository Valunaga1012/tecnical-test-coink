import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMG_BACK, IMG_CHECK } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-pad-number',
  templateUrl: './pad-number.component.html',
  styleUrls: ['./pad-number.component.scss'],
})
export class PadNumberComponent {
  
  public imgCheck = IMG_CHECK;
  public imgBack = IMG_BACK;
  public istex: boolean = true;
  private numbers: string = '';
  private codeEncrypt: string = '';
  
  @Output() next: EventEmitter<boolean>;
  @Input() form: any;
  @Input() formName: any;
  @Input() isValid: boolean = false;

  public numberPad: Array<any> = [{ number: '1' }, { number: '2' }, { number: '3' }, { number: '4' }, { number: '5' }, { number: '6' }, { number: '7' }, { number: '8' }, { number: '9' }];
  constructor() { 
    this.next = new EventEmitter()
  }

  public getNumber(number: string): void {
    this.pruebaKey(number)
  }

  public pruebaKey(number?): void {
      if (this.formName) {
        this.numbers = this.numbers + number;
        this.form.get(this.formName).setValue(this.numbers);
      }
  }

  public sendCode(form): void {
    if (form.valid) {
      this.next.emit();
      this.numbers='';
    }
  }

  public borrar(): void {
    if (!this.istex)
      this.codeEncrypt = this.codeEncrypt.slice(0, -1)
    this.numbers = this.numbers.slice(0, -1);
    this.pruebaKey('')
  }
}
