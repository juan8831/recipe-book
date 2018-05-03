import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sl-options',
  templateUrl: 'sl-options.html',
})
export class SlOptionsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
  
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlOptionsPage');
  }

  onAction(action: string){
    this.viewCtrl.dismiss({action: action});
  }

}
