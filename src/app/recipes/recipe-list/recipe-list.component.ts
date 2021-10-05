import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // recipes:Recipe[] = [
  //   new Recipe('Pho Ga','pho nau voi nuoc leo','https://media.istockphoto.com/photos/vietnamese-pho-with-spicy-sriracha-sauce-shot-top-down-picture-id503129686?s=612x612'),
  //   new Recipe('Com ga','Rice and chicken','https://delightfulplate.com/wp-content/uploads/2019/06/Vietnamese-Chicken-Rice-Com-Ga-Hoi-An-1-1365x2048.jpg'),
  //   new Recipe('Com ga','Rice and chicken','https://delightfulplate.com/wp-content/uploads/2019/06/Vietnamese-Chicken-Rice-Com-Ga-Hoi-An-1-1365x2048.jpg')
  // ]
  //
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  // constructor() { }
  //
  // ngOnInit(): void {
  // }
  //
  // onRecipeSelected(recipeWasSelected:Recipe){
  //   this.recipeWasSelected.emit(recipeWasSelected);
  // }


  // @ts-ignore
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  // @ts-ignore

  recipes: Recipe[];
  constructor(private recipeService:RecipeService,
              private router:Router,
              private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.recipes= this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipeWasSelected:Recipe){
  //   this.recipeWasSelected.emit(recipeWasSelected);
  // }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }
}
