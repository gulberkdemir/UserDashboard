import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TextInputComponent implements OnInit{
  @Input() controlName?: string;
  @Input() label?: string;
  @Input() placeHolder?: string;
  @Input() conditionFirst?: boolean;
  @Input() conditionSecond?: boolean;

  formGroup?: FormGroup;

  constructor(private ctrlContainer: FormGroupDirective, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.ctrlContainer.form;
    const control = new FormControl('');
    this.formGroup.addControl(this.controlName!, control);
  }

}
