import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import {ShoppingListService} from "./shoppingList.service";
import {RecipeService} from "../recipes/recipe.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apple',5),
  //   new Ingredient('Tomatos', 10)
  // ];
  // @ts-ignore
  ingredients: Ingredient[];
  // @ts-ignore
  private inChangeSub: Subscription;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.inChangeSub = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  onEditItem(index:number){
    // @ts-ignore
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.inChangeSub.unsubscribe();
  }

  // onIngredientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient);
  // }
}
