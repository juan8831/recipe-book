import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  index: number;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  editRecipe: Recipe;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeProvider: RecipeProvider
  ) {
  }

  ngOnInit()
  {
    this.mode = this.navParams.get('mode');  
    if(this.mode == 'Edit'){
      this.editRecipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index'); 
    }
    
    this.initForm();

  }

  private initForm()
  {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.editRecipe.title;
      description = this.editRecipe.description;
      difficulty = this.editRecipe.difficulty;
      for(let item of this.editRecipe.ingredients){
        ingredients.push(new FormControl(item.name, Validators.required));
      }

    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });

  }

  onSubmit()
  {
    const val = this.recipeForm.value;
    let ingredients = [];
    if(val.ingredients.length > 0) {
      ingredients = val.ingredients.map( name => {
        return {name: name, amount: 1};
      });
    }
    var newRecipe = new Recipe(val.title, val.description, val.difficulty, ingredients);

    this.mode == 'New'? this.recipeProvider.addRecipe(newRecipe) : this.recipeProvider.updateRecipe(this.index, newRecipe);
    
    this.recipeForm.reset();

    this.navCtrl.popToRoot();
  }

  private createNewIngredientAlert()
  {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              this.toastCtrl.create({
                message: 'Please enter a valid value',
                duration: 1000,
                position: 'bottom'
              }).present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
            .push(new FormControl(data.name, Validators.required));
            this.toastCtrl.create({
              message: 'Item added',
              duration: 1000,
              position: 'bottom'
            }).present();

          }
        }
      ]
    });
  }

  onManageIngredients()
  {
    const actionSheet = this.actionSheetCtrl.create(
      {
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Add Ingredient',
            handler: () => {
              this.createNewIngredientAlert().present();
            }
          },
          {
            text: 'Remove All Ingredients',
            role: 'destructive',
            handler: () => {
              const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
              const len = fArray.length;
              if(len > 0){
                for(let i  = len -1 ; i >= 0; i--)
                {
                  fArray.removeAt(i);
                }
                this.toastCtrl.create({
                  message: 'All items removed',
                  duration: 1000,
                  position: 'bottom'
                }).present();
              }
              
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }
    );

    actionSheet.present();

    
  }
  

}
