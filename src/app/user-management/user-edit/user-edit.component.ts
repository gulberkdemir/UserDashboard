import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {UserInterface} from "../../types/user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{
  id?: number;
  userEditForm!: FormGroup;
  user?: UserInterface;
  constructor(     private route: ActivatedRoute,
                   private router: Router,
                   private apiService: ApiService, private fb: FormBuilder) {
    this.userEditForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('',[Validators.required, Validators.email] ),
      street:  new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]),
      city:  new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]+$') ]),
      zipCode:  new FormControl('', [Validators.pattern('^[0-9]*$') ]),
    });
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
        this.user =res;
        this.userEditForm.setValue({
          firstName: this.user?.firstName,
          lastName: this.user?.lastName,
          email: this.user?.email,
          street:this.user?.street,
          city:this.user?.city,
          zipCode: this.user?.zipCode
        })
      }
    );






  }

  Submit(){
    console.log('hello')
  }




}
