import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
 
  IsAdmin =  false;
  IsLogin = false;
  ngOnInit(): void { 

    if (localStorage.getItem("IsLogin") == "true") {
      this.IsLogin = true;
      console.log("nav bar is IsLogin true");
    } 

    if (localStorage.getItem("IsAdmin") == "true") {
      this.IsAdmin = true;      
      console.log("nav bar ADMIN ");
    } 
   
    }
 
    logout() {
      this.IsAdmin, this.IsLogin = false;
      localStorage.clear();
      this.router.navigate(['/home']).then( ()=> window.location.reload());
      
    }


}
