import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable, Input} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shoppingList.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();
  private recipes:Recipe[] = [
    new Recipe(
      'Pho Ga',
      'pho nau voi nuoc leo',
      'https://media.istockphoto.com/photos/vietnamese-pho-with-spicy-sriracha-sauce-shot-top-down-picture-id503129686?s=612x612',
      [
        new Ingredient('onion',5),
        new Ingredient('egg',4)]
    ),
    new Recipe(
      'Com ga',
      'Rice and chicken',
      'https://delightfulplate.com/wp-content/uploads/2019/06/Vietnamese-Chicken-Rice-Com-Ga-Hoi-An-1-1365x2048.jpg',
      [
        new Ingredient('rice',1),
        new Ingredient('sugar',1)],
    ),
    new Recipe(
      'Com suon',
      'Rice and chicken',
      'https://delightfulplate.com/wp-content/uploads/2019/06/Vietnamese-Chicken-Rice-Com-Ga-Hoi-An-1-1365x2048.jpg',
      [
        new Ingredient('chicken',2),
        new Ingredient('rice',4)]
    )
  ]

  recipeChanged = new Subject<Recipe[]>();

  constructor(private slService:ShoppingListService) {
  }
  getRecipes(){
    return this.recipes.slice(); //get a copi of recipe
  }
  getRecipe(index: number){
    return this.recipes[index];
  }

  addNewRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number,newRecipe:Recipe){
    this.recipes[index]= newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients)
  }

}
