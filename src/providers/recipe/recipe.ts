import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { AuthProvider } from '../auth/auth';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the RecipeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipeProvider {

  private recipes: Recipe [] = [];

  constructor(private authProvider: AuthProvider, private http: HttpClient) {
    console.log('Hello RecipeProvider Provider');
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
  }

  getRecipes(){
    return this.recipes.slice(0);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }

  removeRecipe(index: number){
    this.recipes.splice(index, 1);

  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[0] = recipe;
  }

  storeList(token: string){
    const userId = this.authProvider.getActiveUser().uid;
    const url = 'https://recipebook-968cf.firebaseio.com/' + userId + '/recipes.json?' 
    + 'auth=' + token;
    return this.http.put(url, this.recipes );
  }

  fetchList(token: string){
    const userId = this.authProvider.getActiveUser().uid;
    const url = 'https://recipebook-968cf.firebaseio.com/' + userId + '/recipes.json?' 
    + 'auth=' + token;
    return this.http.get(url );

  }


}
