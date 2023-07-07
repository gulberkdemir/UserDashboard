import {Component, Input} from '@angular/core';
import {UserInterface} from "../../types/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user!: UserInterface ;

}
