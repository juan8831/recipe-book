import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient';


@Injectable()
export class ShoppingListProvider {

  private shoppingList: Ingredient[] = [];

  constructor() {
    console.log('Hello ShoppingListProvider Provider');
  }

  getShoppingList()
  {
    return this.shoppingList.slice(); //return copy 
  }

  addItem(item: Ingredient)
  {
    console.log(item);
    this.shoppingList.push(item);
  }

  addItems(items: Ingredient[])
  {
    // items.forEach((item) => {
    //   this.shoppingList.push(item);
    // });
    this.shoppingList.push(...items);
  }

  removeItem(item: Ingredient)
  {
    var index = this.shoppingList.findIndex((item) => {
      return item.name == item.name && item.amount == item.amount;
    });
    this.shoppingList.splice(index, 1);
  }

  removeItemAtIndex(index: number)
  {
    this.shoppingList.splice(index, 1);
  }

}
