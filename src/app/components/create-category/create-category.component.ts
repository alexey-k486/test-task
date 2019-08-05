import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  @Output() public create: EventEmitter<string> = new EventEmitter();
  @Output() public cancel: EventEmitter<void> = new EventEmitter();
  public createForm: FormGroup;

  public ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  public createCategory(): void {
    this.create.emit(this.createForm.value.title);
  }

  public closeForm(): void {
    this.cancel.emit();
  }
}
