import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { FIRST_NUMBER, IMG_BACK, IMG_CHECK, IMG_OINK, KEY_ENCRYPT_DESENCRYPT, TEXT_CODE_PHONE, TEXT_INFO_PHONE } from 'src/app/core/constants/constants';
import { ApiService } from 'src/app/core/services/api.service';
import { EncryptService } from 'src/app/core/services/encrypt.service';
import { FormService } from 'src/app/core/services/form.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})
export class PasoUnoComponent implements OnInit {

  @Output() paso = new EventEmitter<number>();
  public istex: boolean = true;
  public phoneNumber: string;
  public registerForm: FormGroup;
  public formName: string;
  public texts = { text: TEXT_INFO_PHONE, text1: TEXT_CODE_PHONE };
  public imges = { oink: IMG_OINK, back: IMG_BACK, check: IMG_CHECK };
  private error: any;
  private numbers: string = '';
  private codeEncrypt: string = '';
  public isKeyboardHide: boolean = true;

  constructor(
    private api: ApiService,
    private encrypt: EncryptService,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public popoverController: PopoverController,
    private localStorage: LocalStorageService,
    private formServices: FormService) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      phone_number: ['', [Validators.pattern(FIRST_NUMBER), Validators.maxLength(10)]],
      verification_id: ['',[ Validators.maxLength(4)]]
    });
  }

  public getFormName(event) {
    this.formName = event.target.attributes[3].value;
  }

  private encryptData(phone) {
    return this.encrypt.encrypt(phone, KEY_ENCRYPT_DESENCRYPT);
  }

  public validateNumber(){
    console.log(this.registerForm.get('phone_number').value);
    return this.registerForm.get('phone_number').value?.length === 10;
  }

  validateCoder(){
    console.log(this.registerForm.get('verification_id').value);
    return this.registerForm.get('verification_id').value?.length == 4;
  }

  private sendCode(phone: string): void {
    this.api.sendVerificationNumber(this.encryptData(phone)).subscribe(resp => {
      if (resp) {
        this.istex = false;
        const respDecrypt = this.encrypt.decrypt(resp.payload, KEY_ENCRYPT_DESENCRYPT);
        this.registerForm.controls.verification_id.reset()
        this.registerForm.reset()
        this.codeEncrypt = ''
        this.numbers = ''
      }
    }, (error: HttpErrorResponse) => {
      this.error = error.error.message;
      console.log(this.error);
    });
  }

  resetForms() {
    this.registerForm.get('verification_id').setValue('');
    this.numbers = '';
    this.codeEncrypt = '';
  }

  // public pruebaKey(number?): void {
  //   if (!this.istex) {
  //     if (number != '')
  //       this.codeEncrypt = this.codeEncrypt + 'X';
  //     this.numbers = this.numbers + number;
  //     this.registerForm.get('verification_id').setValue(this.codeEncrypt);
  //     this.validator();
  //     console.log(this.numbers);
  //     console.log(this.codeEncrypt);

  //   } else {
  //     this.numbers = this.numbers + number;
  //     this.registerForm.get('phone_number').setValue(this.numbers);
  //   }

  // }

  public validator() {
    if (this.registerForm.get('verification_id').value == '1234') {
      if (this.numbers == '1234') {
        this.localStorage.create('DATA', { number_phone: this.phoneNumber })
        this.paso.emit(1)
      }
      else
        this.createModal();
    }
  }

  public next(form): void {
    if (form.valid) {
      this.phoneNumber = form.value.phone_number
      const payload = this.createData(form.value.phone_number);
      this.numbers = '';
      this.sendCode(payload);
    }
  }

  createData(phone_number) {
    return `{"phone_number":"57${phone_number}","log_signup_id":""}`;
  }

  public getErrorMessage(field: string): string {
    return this.formServices.getErrorMessage(this.registerForm, field, 'Ingrese un numero valido ej: 3155555555');
  }

  public checkErrors(field: string): boolean | undefined {
    return this.formServices.checkErrors(this.registerForm, field);
  }

  public async createModal(): Promise<void> {
    const popover: HTMLIonModalElement =
      await this.modalController.create({
        component: ModalComponent,
        cssClass: 'register-modal',
        componentProps: {
          header: 'CÓDIGO INCORRECTO',
          body: 'El código que ingresaste es incorrecto, enviaremos un nuevo código a tu correo electrónico.',
          footer: 'Reenviar código'
        }
      });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    this.resetForms();
    if (data.data)
      this.sendCode(this.createData(this.phoneNumber));
  }
}
