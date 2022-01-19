import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs/operators';
import { FOUR_CHARACTERS_REGEX, HAS_NUMBER } from 'src/app/core/constants/constants';
import { Doc } from 'src/app/core/models/doc.interface';
import { Gender } from 'src/app/core/models/gender.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
})
export class PasoDosComponent implements OnInit {

  @Output() paso = new EventEmitter<number>();
  public oinkImg:string = 'assets/img/Oink-M.svg'
  public typeDoc: Array<Doc>;
  public genders: Array<Gender>;
  public infoUserForm: FormGroup;
  public isShow: boolean;
  public isShowEye: boolean;
  
  constructor(
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.buildForm();
    this.getGenders()
    this.getDocumentType()
  }

  private buildForm(): void {
    this.infoUserForm = this.formBuilder.group({
      type_doc:  ['', [Validators.required]],
      num_doc:  ['', [Validators.required, Validators.min(100000)]],
      expedition_date: ['', [Validators.required]],
      birth_date:  ['', [Validators.required]],
      gender:  ['', [Validators.required]],
      email:  ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]],
      pin:  ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern(FOUR_CHARACTERS_REGEX)]],
      confirmPin: ['',[Validators.required, Validators.maxLength(4), Validators.minLength(4)]]
		});
  }

  private getGenders(): void {
    this.api.getgenders().subscribe((response:Gender[]) =>{
      this.genders = response
    });
  }

  private getDocumentType(): void {
    this.api.getDocumentTypes().subscribe((response:Doc[]) =>{
      this.typeDoc = response
    });
  }

  get confirmPin(): string {
    return this.infoUserForm.get('confirmPin').value;
  }

  get confirmEmail(): string {
    return this.infoUserForm.get('confirmEmail').value;
  }

  public validateinput(param: string): boolean {
    if (param.length > 0)
      return this.infoUserForm.get(param).invalid && this.infoUserForm.get(param).touched;
  }

  public matchingPin(confirmPin: string): boolean {
    if (this.infoUserForm.get('pin').value !== confirmPin)
      return false;
    if (this.infoUserForm.get('pin').value === confirmPin)
      return true;
  }

  public matchingEmail(confirmEmail: string): boolean {
    if (this.infoUserForm.get('email').value !== confirmEmail)
      return false;
    if (this.infoUserForm.get('email').value === confirmEmail)
      return true;
  }

  public next(info): void {
    let phone = this.localStorage.getItem('DATA');
    phone = {phone,info};
    this.localStorage.create('DATA',[phone])
    this.paso.emit(2)
  }
}
