import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shoppingList.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ts-ignore
  //@ViewChild('nameInput') nameInputRef: ElementRef;
  // @ts-ignore
  //@ViewChild('amountInput') amountInputRef: ElementRef;
  //@Output() ingredientAdd = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  // @ts-ignore
  subscription: Subscription;
  // @ts-ignore
  editedItemIndex:number;
  editMode = false;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.startedEditing
      .subscribe(
        (index:number) => {
          this.editMode = true;
          this.editedItemIndex = index;

          this.slForm.setValue({
            name:this.shoppingListService.getIngredient(this.editedItemIndex).name,
            amount:this.shoppingListService.getIngredient(this.editedItemIndex).amount,
          })
        }
      )
  }
  // @ts-ignore

  onSubmit(form:NgForm){
    const value = form.value;
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputRef.nativeElement.value;

    //const newIngredient = new Ingredient(ingName,ingAmount);
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
      this.editMode = false;

    }else{
      console.log("false value");
      this.shoppingListService.addIngredient(newIngredient);
    }
    form.reset();
    //this.ingredientAdd.emit(newIngredient);
  }

  onClearForm(){
    this.editMode = false;
    this.slForm.reset();

  }

  onDeleteForm(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
  }

}
