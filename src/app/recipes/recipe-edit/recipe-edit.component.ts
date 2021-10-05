import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";

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
               private recipeService: RecipeService) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params:Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          this.initForm();
        }
      );
  }
  onSubmit(){
    console.log(this.recipeForm.value)
  }

  private initForm(){
    const recipe = this.recipeService.getRecipe(this.id);
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";


    if(this.editMode){
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)

    });
  }



}