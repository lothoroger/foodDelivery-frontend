import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/model/cart';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  loggeduser: any;
  scust:any;
  aUser: User[] = [];
  cart!: Cart;
  payForm: FormGroup = new FormGroup({});
 
  custRetrievedBool: boolean = false;
  updation: boolean = false;
  loader: boolean = false;
  constructor(private cartService: CartService,
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toast: ToastrService

  ) {
    this.cartService.getCartObservable().subscribe((data: any) => {
      this.cart = data;
    })
  }


ngOnInit(): void {
    //Obtain the Role for pre-fill
    this.loggeduser = localStorage.getItem("role");
    this.initializeForm(this.loggeduser); 
}

initializeForm(scust: any | null) {

  if (scust == null) {
     this.payForm = this.fb.group({
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
       const acust = JSON.parse(scust);
       this.payForm = this.fb.group({
         
          id: [acust.id],
          email:  [acust.email],
          password: [acust.password ],
          firstname: [acust.firstname],
          lastname: [acust.lastname],
          phone: [acust.phone],
          address: [acust.address],
          city: [acust.city],
          state: [acust.state],
          zip: [acust.zip],
          role: [acust.role],
        });
        
      }
    }
}


