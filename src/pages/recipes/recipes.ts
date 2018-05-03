import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { RecipePage } from '../recipe/recipe';
import { AuthProvider } from '../../providers/auth/auth';
import { SlOptionsPage } from '../sl-options/sl-options';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private recipeProvider: RecipeProvider,
    private menuCtrl: MenuController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private popOverCtrl: PopoverController,
    private alertCtrl: AlertController
  ) {
    //this.menuCtrl.enable(true, 'menu2');
  }

  ionViewDidEnter() {
    this.recipes = this.recipeProvider.getRecipes();
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number){
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
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
          this.recipeProvider.fetchList(token).subscribe(
            (data : Recipe []) => {
              loading.dismiss();
              if(data){
                data.forEach((x) => {
                  if(x.ingredients == null){
                    x.ingredients = []
                  }
                });
                this.recipeProvider.setRecipes(data);
                this.recipes = data;
              }
              else{
                this.recipes = [];
                this.showError("No recipes found");               
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
          this.recipeProvider.storeList(token).subscribe(
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
