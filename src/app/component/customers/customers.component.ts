import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { DbService } from 'src/app/services/db.service';
import { BaseUrls } from 'src/assets/BaseUrls';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {


 
  custForm: FormGroup = new FormGroup({});
  customers: User[] = [];
  custRetrievedBool: boolean = false;
  updation: boolean = false;
  loader: boolean = false;
  loggeduser: any;
  
  constructor(private dbService: DbService,
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toast: ToastrService

  ) {

  }


  ngOnInit(): void {
    this.dbService.getCustomers();
    this.dbService.user.subscribe((data) => {
       if (data.length !== 0) {this.customers = data} else { this.customers = []};
      1 
     })
  }

  openModal(modal: any, user: User | null = null) {
    this.initializeModal(user);
    this.modalService.open(modal, { size: "xl" });
  }
 
  initializeModal(userObj: User | null) {
    if (userObj == null) {
      this.updation = false;
      this.custForm = this.fb.group({
        email:  ["", Validators.required],
        password: ["", Validators.required],
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        phone: [""],
        address: [""],
        city: [""],
        state: [""],
        zip: [""],
        role:["Customer"],

          });
    
        } else {
          this.updation = true;
          this.custForm = this.fb.group({
            id: [userObj.id],
            email:  [userObj.email, Validators.required],
            password: [userObj.password, Validators.required],
            firstname: [userObj.firstname, Validators.required],
            lastname: [userObj.lastname, Validators.required],
            phone: [userObj.phone],
            address: [userObj.address],
            city: [userObj.city],
            state: [userObj.state],
            zip: [userObj.zip],
            role: [userObj.role],
          });
          
        }
      }


      deleteUser(id: any) {
        console.log('Customer list delete', id)
         this.customers = this.customers.filter(x => x.id != id)
         this.http.delete(`${BaseUrls.deleteUrl(BaseUrls.USER_GROUPURL)}/${id}`)
          .subscribe({
            next: () => {
              this.customers.splice(id, 1)
              console.log("Customer deleted ", id);
            },
            error: (error) => {
              console.log("Error on Delete ", error);
            }
          })      
      }


      saveUser() {
           if (this.updation == true) {
          this.http.put(`${BaseUrls.updateUrl(BaseUrls.USER_GROUPURL)}/${this.custForm.value.id}`, this.custForm.value)
            .subscribe({
              next: ({ code, data, message }: any) => {
                console.log('Update User', data)
              
              },
              error: (error) => {
                console.log(error);
                console.log('Update User error', this.custForm.value);
              }
            })
            this.dbService.getCustomers();
        } else {
          console.log('Add User ', this.custForm.value)
    
          this.http.post(`${BaseUrls.addUrl(BaseUrls.USER_GROUPURL)}`, this.custForm.value)
            .subscribe({
              next: ({ code, message, data }: any) => {
                console.log("Adding User ", this.custForm.value);
                localStorage.setItem("Data", JSON.stringify(data));
    
              },
              error: (error) => {
                console.log("Error ", error);
    
              }
            })
    
        }
        this.modalService.dismissAll();
        this.dbService.getCustomers();
      }
    




    }
