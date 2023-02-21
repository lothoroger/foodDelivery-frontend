import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cuisines } from 'src/app/model/cuisines';
import { DbService } from 'src/app/services/db.service';
import { BaseUrls } from 'src/assets/BaseUrls';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.css']
})
export class CuisinesComponent {
 

  constructor(private http: HttpClient, private dbService: DbService, private modalService: NgbModal, private fb: FormBuilder) { }


  foodForm: FormGroup = new FormGroup({});
  foodlist: Cuisines[] = [];

  updation: boolean = false;
  loader: boolean = false;

  ngOnInit(): void {
    this.dbService.getCuisines();
   this.dbService.cuisines.subscribe((data) => {
      if (data.length !== 0) this.foodlist = data;

    })
  }


  openModal(modal: any, food: Cuisines | null = null) {
    this.initializeModal(food);
    this.modalService.open(modal, { size: "xl" });
  }


  initializeModal(foodObj: Cuisines | null) {
    if (foodObj == null) {
      this.updation = false;
      this.foodForm = this.fb.group({
        id: [""],
        name: ["", Validators.required],
        origin: ["", Validators.required],
        price: [0, Validators.required],
        available: [0],
        addedon: [""],
        image: [""],
      });

    } else {
      this.updation = true;
      this.foodForm = this.fb.group({
        id: [foodObj.id],
        name: [foodObj.name, Validators.required],
        origin: [foodObj.origin, Validators.required],
        price: [foodObj.price, Validators.required],
        available: [foodObj.available],
        addedon: [foodObj.addedon],
        image: [foodObj.image],

      });
    }
  }

  saveCuisine() {
    if (this.updation == true) {
      this.http.put(`${BaseUrls.updateUrl(BaseUrls.CUISINES_GROUPURL)}/${this.foodForm.value.id}`, this.foodForm.value)
        .subscribe({
          next: ({ code, data, message }: any) => {
            console.log('Update Cuisine', data)
            localStorage.setItem("Cuisine update", JSON.stringify(this.foodForm.value));
          },
          error: (error) => {
            console.log(error);
            console.log('Update Cuisine error', this.foodForm.value);
          }
        })
    } else {
      console.log('Add Cuisine ', this.foodForm.value)

      this.http.post(`${BaseUrls.addUrl(BaseUrls.CUISINES_GROUPURL)}`, this.foodForm.value)
        .subscribe({
          next: ({ code, message, data }: any) => {
            console.log("Adding Food ", this.foodForm.value);
            localStorage.setItem("Data", JSON.stringify(data));

          },
          error: (error) => {
            console.log("Error ", error);

          }
        })
        
    }
   
    this.modalService.dismissAll();
        this.dbService.getCuisines();
  }



deleteCuisine(id: any) {
  console.log('Food list delete', id)
   this.foodlist = this.foodlist.filter(x => x.id != id)
   this.http.delete(`${BaseUrls.deleteUrl(BaseUrls.CUISINES_GROUPURL)}/${id}`)
    .subscribe({
      next: () => {
        this.foodlist.splice(id, 1)
        console.log("Cuisine deleted ", id);
      },
      error: (error) => {
        console.log("Error on Delete ", error);
      }
    })

    this.modalService.dismissAll();
    this.dbService.getCuisines();

}

updateCuisine( foodForm: any) {
  console.log('Food Update ', foodForm.get('id'))
   this.foodlist = this.foodlist.filter(x => x.id != foodForm.get('id'))
   this.http.put(`${BaseUrls.updateUrl(BaseUrls.CUISINES_GROUPURL)}/${this.foodlist}`,foodForm)
   .subscribe({
      next: () => {
        //this.foodlist.splice(id, 1)
        console.log("Update Cuisine foodForm ", foodForm);
        console.log("Update Cuisine this.foodlist ", this.foodlist)
      },
      error: (error) => {
        console.log("Error on Delete ", error);
      }
    })

    this.modalService.dismissAll();
    this.dbService.getCuisines();

}

addCuisine() {
  console.log("Add Cuisine ", this.foodForm.value);
  this.http.post(BaseUrls.addUrl(BaseUrls.CUISINES_GROUPURL), this.foodForm.value)
    .subscribe({
      next: () => {
        console.log("Add Cuisine  ", this.foodForm.value);
        console.log("Add Cuisine this.foodlist ", this.foodlist)
   
       
      },
      error: (error) => {
        console.log("Error on Add Cuisine ", error);
      }
    })

    this.modalService.dismissAll();
    this.dbService.getCuisines();
}



}
