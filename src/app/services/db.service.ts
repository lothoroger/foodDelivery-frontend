import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { BaseUrls } from 'src/assets/BaseUrls';
import { Cuisines } from '../model/cuisines';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  userRetrievedBool: boolean = false;
  users : any;
  
  cuisines: BehaviorSubject<Cuisines[]> = new BehaviorSubject<Cuisines[]>([]);
  cuisinesRetrievedBool: boolean = false;


  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) { }
/*
  loginUser(datac: any) {
      this.http.post(BaseUrls.getLoginUrl(BaseUrls.USER_GROUPURL), datac)
      .subscribe({
        next: ({ code, message, datat}: any) => {
           this.user.next(Object.assign([],datat));

          this.userRetrievedBool = true;
            localStorage.setItem("role",JSON.stringify(datat));
          },
          error: (error) => {
            console.log(error);
          }
        })
      }

*/

 

  getCuisines() {
    this.http.get(BaseUrls.getUrl(BaseUrls.CUISINES_GROUPURL))
      .subscribe({
        next: async ({ code, data, message }: any) => {
          this.cuisines.next(Object.assign([], data));
          console.log("Cusines ", data)
          console.log("Cusines m ", message)
          this.cuisinesRetrievedBool = true;
                 
        },
        error: (error) => {
          console.log(error);
        }
      })
    }


    getCustomers() {
      this.http.get(BaseUrls.getUrl(BaseUrls.USER_GROUPURL))
        .subscribe({
          next: async ({ code, data, message }: any) => {
            this.user.next(data);
            console.log("Users  customers ", data)
            console.log("Users message ", message)
            this.userRetrievedBool = true;
                 
          },
          error: (error) => {
            console.log(error);
          }
        })
        
        
    }



/*
      deleteCuisines() {
        this.http.get(BaseUrls.getUrl(BaseUrls.CUISINES_GROUPURL))
          .subscribe({
            next: async ({ code, data, message }: any) => {
              this.cuisines.next(Object.assign([], data));
              console.log("Cusines ", data)
              console.log("Cusines m ", message)
              this.cuisinesRetrievedBool = true;
                     
            },
            error: (error) => {
              console.log(error);
            }
          })



  }

*/

  addUser(data: any) {
    console.log("Data on dbservice addUser ", data);
    this.http.post(BaseUrls.addUrl(BaseUrls.USER_GROUPURL), data)
      .subscribe({
        next: ({ code, data, message }: any) => {
          this.user.next(data);
          this.userRetrievedBool = true;
         
        },
        error: (error) => {
          console.log(error);
        }
      })
     
      this.router.navigateByUrl('/orders');
  }

  /*loginUser(value: { email: string; password: string} ) {
  
    console.log("db service Loginuser ", value);
    const formData = new FormData();
    formData.append("email", value.email.trim() || "");
    formData.append("password", value.password.trim() || "");

    this.http.post(BaseUrls.getLoginUrl(BaseUrls.USER_GROUPURL), formData )
      .subscribe({
        next: ({ code, data, message }: any) => {
          console.log("Subscribe on Dbscercie Loginuser ", formData);
          localStorage.setItem("authCode", code);
          localStorage.setItem("user ", JSON.stringify(data[0]));
          this.toast.success(message, "Login Successfull");
          this.router.navigate(['/administrator'], { replaceUrl: true })
         

        },
        error: (error) => {
          console.log(error);
        }
      })
*/
  }



