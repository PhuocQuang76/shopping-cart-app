import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping-cart-app';
  //loadedFeature: string = '';
  //genders = ['Male','Female'];
  // @ts-ignore
  signupForm: FormGroup;
  // @ts-ignore
  projectForm: FormGroup;
  check:boolean = true;

  // @ts-ignore
  ngOnInit(){

    // @ts-ignore
    // @ts-ignore
    // this.projectForm = new FormGroup({
    //   projectName : new FormControl(null,[Validators.required,this.invalidProjectName.bind(this)]),
    //   email: new FormControl(null,[Validators.required,Validators.email]),
    //   projectStatus: new FormControl('critical')
    // });
    // this.projectForm.get('projectName')?.setErrors({ invalid: 'Invalid Username' });
    //
    //
    // this.signupForm = new FormGroup({
    //   username: new FormControl(null,Validators.required),
    //   email:new FormControl(null,[Validators.required,Validators.email])
    // })
    // @ts-ignore

  }
  forbiddenProjectName = 'test'

  onNavigate(feature:string){
    //this.loadedFeature = feature;
  }

  onSaveProject(){
    console.log(this.projectForm.value);
  }

  // @ts-ignore
  // invalidProjectName(control:FormControl):{[s:string]:boolean}{
  //   if(control.value === this.forbiddenProjectName){
  //     return {'invalidProjectName': true};
  //   }
  //     // @ts-ignore
  //   return null;
  // }
  // @ts-ignore
  // invalidEmail(control:FormControl): Promise<any> | Observable<any>{
  //   const promise = new Promise<any>(
  //     (resolve, reject) => {
  //       setTimeout(()=>{
  //         if(control.value === "test@yahoo.com"){
  //           resolve({'invalidEmail': true});
  //         }else{
  //           resolve(null)
  //         }
  //       },1500)
  //   })
  // }
  // invalidEmail(control:FormControl): Promise<any> | Observable<any>{
  //   const promise = new Promise<any>(
  //     (resolve, reject) => {
  //       setTimeout(()=>{
  //         if(control.value === "test@yahoo.com"){
  //           resolve({'invalidEmail': true});
  //         }else{
  //           resolve(null);
  //         }
  //       },1500);
  //     })
  //   return promise
  // }
  onSubmit(){

  }

}
