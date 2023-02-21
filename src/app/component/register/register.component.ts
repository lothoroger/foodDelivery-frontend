import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    role: new FormControl(null,[Validators.required] ),
    firstname: new FormControl(null),
    lastname: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null ),
    state: new FormControl(null ),
    zip: new FormControl(null )

  })
  constructor(private router: ActivatedRoute, private dbservice: DbService, private authService: AuthService) { }
 
  IsAdmin = false;
  role= "";
  

  ngOnInit(): void {
    
    this.router.queryParams.subscribe((params: any) => {
      this.registerForm.value.role = Object.values(params).toString();
      console.log(" value of role is = ",this.registerForm.value.role );
      if (this.registerForm.value.role == "Customer") {
        this.IsAdmin = false;
      } else {
        this.IsAdmin = true;
      }
      this.role = this.registerForm.value.role;
    }); 
  }

  Register() {
    
    this.router.queryParams.subscribe((params: any) => {
    this.registerForm.value.role = Object.values(params).toString();
    console.log("Registration ", this.registerForm.value);
    this.dbservice.addUser(this.registerForm.value);
  })}
}