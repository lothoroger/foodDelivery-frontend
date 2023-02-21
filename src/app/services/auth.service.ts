import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { BaseUrls } from 'src/assets/BaseUrls';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  User = new BehaviorSubject<any>(null);
  
  userRetrievedBool: boolean = false;
  customers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  custRetrievedBool: boolean = true;
  IsAdmin = false;
  authInfo$ = false;
  constructor(
    // private authorize: AuthService,
    private toast: ToastrService,
    private http: HttpClient,
    private routed: ActivatedRoute,
    private router: Router

  ) { }


 ngOnInit(): void {
    localStorage.clear();
  /*  this.routed.queryParams.subscribe((params: any) => {
      this.User.value.role = Object.values(params).toString();
      console.log(" value of role is ",this.User.value.role );
      if (this.User.value.role == "Customer") {
        this.IsAdmin = false;
      } else {
        this.IsAdmin = true;
      }
      console.log(" on NGinit autservice ", this.UserSubjectValue?.valueOf.toString);

     
    });
  */ }

  UserRole() {
  this.routed.queryParams.subscribe((params: any) => {
    this.User.value.role = Object.values(params).toString();
    console.log(" value of role is ",this.User.value.role );
    if (this.User.value.role == "Customer") {
      this.IsAdmin = false;
    } else {
      this.IsAdmin = true;
    }
   
  });
  }
  /*loginSubmit = () => {
    //this.router.navigate(['/register'], { queryParams: { data: this.role } });
    console.log("login data ", this.loginForm.value);
    let loginaccount = {
      Username: "admin@lanl.gov",
      Password: "admin123"
    }
    console.log("Login form ", loginaccount);
    this.authorize.SignInUser(loginaccount);  } 
*/



  loginUser(datac: any ) {
   
    const cdatac = JSON.stringify(datac);
     this.http.post(BaseUrls.getLoginUrl(BaseUrls.USER_GROUPURL), JSON.parse(cdatac))
      .subscribe({
        next:  async({ code, datat, message }: any) => {
          localStorage.setItem("role", JSON.stringify(datat));
          localStorage.setItem("IsLogin","true");

          if (datat.role == "Admin") {
            this.IsAdmin = true;
             localStorage.setItem("IsAdmin", "true");
             this.router.navigate(['/customers']).then(()=>location.reload()) //to redisplay for SignOut
             this.toast.success("Administrator Successful ");
            
          }
          else {
            localStorage.setItem("IsAdmin", "false")
            this.router.navigate(['/orders'], { replaceUrl: true }).then(()=>window.location.reload())
            this.toast.success("Customer Successful ");
           
          }
      

        },
        error: (error) => {
          this.toast.success("Account does not exists");
          console.log(error);
        }
      })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
    window.location.reload();
  }

}
