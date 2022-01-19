import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private spinner: any;

  constructor(public loadingController: LoadingController) { }

  public async show(): Promise<any> {
    this.spinner = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'Please wait...',
    });
    await this.spinner.present();
  }

  public async hide(): Promise<any> {
    return await this.spinner?.dismiss()
  }

}