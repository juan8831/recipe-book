import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit()
  {
    this.mode = this.navParams.get('mode');   
    this.initForm();
  }

  private initForm()
  {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });

  }

  onSubmit()
  {
    console.log(this.recipeForm);
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
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));

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
              //if(len >
              
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
