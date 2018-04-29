import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe';

/*
  Generated class for the RecipeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipeProvider {

  recipes: Recipe [] = [];

  constructor() {
    console.log('Hello RecipeProvider Provider');
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


}
