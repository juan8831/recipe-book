import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { auth } from 'firebase';


/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.authProvider.signin(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
      form.reset();
      this.toastCtrl.create({
        message: `Welcome ${this.authProvider.getEmail()}`,
        duration: 5000,
        position: 'bottom'
      }).present();
    })
    .catch(error => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Sign in error',
        message: error.message,
        buttons: ['Ok']
      }).present();

    });

    
  }

}
