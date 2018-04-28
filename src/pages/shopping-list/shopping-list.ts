import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { Ingredient } from '../../models/ingredient';


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
    private slProvider: ShoppingListProvider 
    
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

  removeItem(index: number)
  {
    this.slProvider.removeItemAtIndex(index);
    this.loadIngredients();
  }

  loadIngredients()
  {
    this.ingredients = this.slProvider.getShoppingList();
  }

}
