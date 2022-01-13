import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {relativeFrom} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  // @ts-ignore
  id: number;
  editMode = false;
  // @ts-ignore
  recipeForm: FormGroup;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          this.initForm();
          console.log('RecipeForm');
        }
      );
  }
  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredientArray']
    )
    if(this.editMode){
      //this.recipeService.updateRecipe(this.id,newRecipe)
      console.log(this.recipeForm.value)
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)

      this.router.navigate(['../'],{relativeTo:this.route})
    }else{
      console.log(this.recipeForm.value)
      //this.recipeService.addNewRecipe(newRecipe)
      this.recipeService.addNewRecipe(this.recipeForm.value)
      this.router.navigate(['../'],{relativeTo:this.route})
    }
  }

  get userFormGroups () {
    return <FormArray>this.recipeForm.get('ingredients')
  //this.recipeForm.get('ingredientsArray') as FormArray
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null),
        'amount': new FormControl(null,Validators.pattern(/^([1-9]|1[012])$/))
      })
    )
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSave(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredientArray']
    // )
    // if(this.editMode){
    //   //this.recipeService.updateRecipe(this.id,newRecipe)
    //   console.log(this.recipeForm.value)
    //   this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    //
    //   this.router.navigate(['../'],{relativeTo:this.route})
    // }else{
    //   console.log(this.recipeForm.value)
    //   //this.recipeService.addNewRecipe(newRecipe)
    //   this.recipeService.addNewRecipe(this.recipeForm.value)
    //   this.router.navigate(['../'],{relativeTo:this.route})
    // }
  }
  private initForm(){
    const recipe = this.recipeService.getRecipe(this.id);
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      //check if ingredient array is empty or not.
      //If not empty, then load the values to here
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,
                [
                  Validators.required,
                  Validators.pattern(/^([1-9]|1[012])$/)
                ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'ingredients': recipeIngredients

    });


  }



}
