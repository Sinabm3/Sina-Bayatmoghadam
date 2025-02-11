import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompassGameService} from '../../../service/compass-game.service';
import {CompassGameDto} from '../../dtos/compass-game';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatOption, MatSelect} from '@angular/material/select';


@Component({
  selector: 'app-compass-game-add',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    NgForOf,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatRadioButton,
    MatRadioGroup,
    NgIf,
    MatSelect,
    MatOption
  ],
  templateUrl: './compass-game-add.component.html',
  styleUrl: './compass-game-add.component.css'
})
export class CompassGameAddComponent implements OnInit {
  compassGameForm!: FormGroup;
  numberHorizontalQuestions: number = 0;
  numberVerticalQuestions: number = 0;

  constructor(
    private fb: FormBuilder,
    private compassGameService: CompassGameService,
    private toastService: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.compassGameForm = this.fb.group({
      name: ['', Validators.required],
      horizontalAxisPositiveName: ['', Validators.required],
      horizontalAxisNegativeName: ['', Validators.required],
      verticalAxisPositiveName: ['', Validators.required],
      verticalAxisNegativeName: ['', Validators.required],
      questionDtos: this.fb.array([])
    });
    this.addQuestion(true);
    this.addQuestion(false);
  }

  get questionDtos(): FormArray {
    return this.compassGameForm.get('questionDtos') as FormArray;
  }

  addQuestion(isHorizontal: boolean): void {
    this.questionDtos.push(
      this.fb.group({
        text: ['', Validators.required],
        isHorizontal: [isHorizontal, Validators.required],
        axisPower: [1, Validators.required]
      })
    );
    if (isHorizontal) {
      this.numberHorizontalQuestions++;
    } else {
      this.numberVerticalQuestions++;
    }
  }

  removeQuestion(index: number): void {
    if (this.questionDtos.at(index).get('isHorizontal')?.value) {
      this.numberHorizontalQuestions--;
    } else {
      this.numberVerticalQuestions--;
    }
    this.questionDtos.removeAt(index);
  }

  submit(): void {
    if (this.compassGameForm.valid) {
      const formValue: CompassGameDto = this.compassGameForm.value;
      this.compassGameService.create(formValue).subscribe({
        next: () => {
          this.toastService.success('Game successfully created');
          this.router.navigate(['compass-game']);
        },
        error: (err) => {
          this.toastService.error('Error creating game:', err)
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  questionTypeCanBeChanged(isHorizontal: boolean, willBeHorizontal:boolean): boolean {
    if (isHorizontal && !willBeHorizontal) {
      return this.numberHorizontalQuestions >1;
    }
    if(!isHorizontal && willBeHorizontal) {
      return this.numberVerticalQuestions > 1;
    }
    return true;
  }

  changeLabel(value: boolean) {
    this.numberHorizontalQuestions = value ? this.numberHorizontalQuestions + 1 : this.numberHorizontalQuestions - 1;
    this.numberVerticalQuestions = value ? this.numberVerticalQuestions - 1 : this.numberVerticalQuestions + 1;
  }

  questionTypeCanBeDeleted(isHorizontal:boolean) {
    return this.questionTypeCanBeChanged(isHorizontal,!isHorizontal);
  }
}
