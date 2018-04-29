import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { RecipeProvider } from '../../providers/recipe/recipe';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe
  index: number

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private slProvider: ShoppingListProvider,
    private recipeProvider: RecipeProvider
  ) {
  }

  ngOnInit()
  {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('ingredients');

  }

  ionViewDidLoad() {
    
  }

  onAddIngredients(){
    this.slProvider.addItems(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});

  }

  onDeleteRecipe(){
    this.recipeProvider.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
