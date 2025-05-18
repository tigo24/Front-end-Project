import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    loginForm = new FormGroup({
      userFormControl : new FormControl('', [
        Validators.required,
        Validators.minLength(3),]),
      passFormControl : new FormControl('', [
        Validators.required,
        Validators.minLength(3),]),
    })

  constructor( 
    private router: Router,){}

  user: { username: string; password: string } = {
    username: "admin",
    password: "admin"
  }
  isLoged:boolean = false

  ngOnInit(): void {
    
      const loged = sessionStorage.getItem('isLoged') === 'true'
    this.isLoged = loged;
    console.log(this.isLoged);
  
    if(this.isLoged){
      this.router.navigate(['/dashboard'])
    }else{
      this.router.navigate(['/login'])
    }
    
  }
  isLoginOpen:boolean = false;

  toggleLoginCollapse() {
    this.isLoginOpen = !this.isLoginOpen;
  }
  
  login(){
      if(this.loginForm.controls.userFormControl.value == this.user.username && this.loginForm.controls.passFormControl.value == this.user.password)
    {
      sessionStorage.setItem(`isLoged`,`true`)
    
    this.router.navigate(['/dashboard'])
    }else{
      alert("Wrong User Please try again");
      this.loginForm.controls.userFormControl.setValue('')
      this.loginForm.controls.passFormControl.setValue('')
      }
    }
}


