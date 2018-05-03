import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { SlOptionsPage } from '../sl-options/sl-options';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private slProvider: ShoppingListProvider,
    private popOverCtrl: PopoverController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    
  ) {
  }

  ionViewDidEnter() {
    this.loadIngredients();
  }

  onAddItem(form: NgForm)
  {
    var newIngedient = new Ingredient(form.value.ingredientName, form.value.amount);

    this.slProvider.addItem(newIngedient);
    form.reset();
    this.loadIngredients();
  }

  removeItem(index: number){
    this.slProvider.removeItemAtIndex(index);
    this.loadIngredients();
  }

  loadIngredients(){
    this.ingredients = this.slProvider.getShoppingList();
  }

  onShowOptions(event: MouseEvent){
    const loading = this.loadingCtrl.create({
      content: 'Retreiving shopping list...',
      spinner: 'dots'
    });

    const popOver = this.popOverCtrl.create(SlOptionsPage);
    popOver.present({ev: event});
    popOver.onDidDismiss(data => {
      if(data == null) return;
      loading.present();
      if(data.action == 'load'){
        this.authProvider.getActiveUser().getToken()
        .then((token: string) => {
          this.slProvider.fetchList(token).subscribe(
            (data : Ingredient []) => {
              loading.dismiss();
              if(data){
                this.slProvider.setShoppingList(data);
                this.ingredients = data;
              }
              else{
                this.ingredients = [];
                this.showError("No ingredients found");               
              }             
            },
            error => {
              loading.dismiss();
              this.showError(error.error.error);
            }
          );
        });
      
      }
      else{
        this.authProvider.getActiveUser().getToken()
        .then((token: string) => {
          this.slProvider.storeList(token).subscribe(
            () => {
              loading.dismiss();
            },
            error => {
              loading.dismiss();
              console.log(error);
              this.showError(error.error.error);
            }
          );
        });
      }
    });

  }

  private showError(message: string){
    this.alertCtrl.create({
      title: 'Error',
      message: message,
      buttons: ['Ok']
    }).present();

  }



}
