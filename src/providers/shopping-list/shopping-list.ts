import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class ShoppingListProvider {

  private shoppingList: Ingredient[] = [];

  constructor(
    private http : HttpClient,
    private authProvider: AuthProvider
  ) {
    console.log('Hello ShoppingListProvider Provider');
  }

  setShoppingList(list: Ingredient[])
  {
    this.shoppingList = list;
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

  storeList(token: string){
    const userId = this.authProvider.getActiveUser().uid;
    const url = 'https://recipebook-968cf.firebaseio.com/' + userId + '/shopping_list.json?' 
    + 'auth=' + token;
    return this.http.put(url, this.shoppingList );
  }

  fetchList(token: string){
    const userId = this.authProvider.getActiveUser().uid;
    const url = 'https://recipebook-968cf.firebaseio.com/' + userId + '/shopping_list.json?' 
    + 'auth=' + token;
    return this.http.get(url );

  }

}
