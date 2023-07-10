import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {UserInterface} from "../../shared/types/user.model";
import {HeaderService} from "../../shared/services/header.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy{
  id?: number;
  userEditForm!: FormGroup;
  user?: UserInterface;

  isSaveClickedSub: Subscription;
  constructor(     private route: ActivatedRoute,
                   private router: Router,
                   private apiService: ApiService, private fb: FormBuilder, private headerService: HeaderService) {
    this.userEditForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('',[Validators.required, Validators.email] ),
      street:  new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]),
      city:  new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]+$') ]),
      zipCode:  new FormControl('', [Validators.pattern('^[0-9]*$') ]),
      country: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')])
    });

    this.isSaveClickedSub = this.headerService.isSaveClicked$.subscribe(clickInfo => {
      if(clickInfo){
        this.Submit();
      }})
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.initForm();
    });
  }

  private initForm(){
    this.apiService.getUser(this.id!).subscribe(
      res =>
      {
        this.user = res;
        this.userEditForm.setValue({
          firstName: this.user?.firstName,
          lastName: this.user?.lastName,
          email: this.user?.email,
          street:this.user?.street,
          city:this.user?.city,
          zipCode: this.user?.zipCode,
          country: this.user?.country
        })
      }
    );

  }

  Submit(){
    const updatedUser: UserInterface = {
      id: String(this.id),
      avatar: this.user?.avatar!,
      firstName: this.userEditForm.get('firstName')?.value,
      lastName: this.userEditForm.get('lastName')?.value,
      email: this.userEditForm.get('email')?.value,
      street: this.userEditForm.get('street')?.value,
      city: this.userEditForm.get('city')?.value,
      zipCode: this.userEditForm.get('zipCode')?.value,
      country: this.userEditForm.get('country')?.value,

    }
    this.apiService.editUser(updatedUser, this.id!).subscribe();
    this.apiService.getUser(this.id!).subscribe( k => console.log(k));
    this.headerService.isSaveClicked$.next(false);
  }
  ngOnDestroy() {
    this.isSaveClickedSub.unsubscribe();
  }

}
