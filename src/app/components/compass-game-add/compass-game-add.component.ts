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
    NgIf
  ],
  templateUrl: './compass-game-add.component.html',
  styleUrl: './compass-game-add.component.css'
})
export class CompassGameAddComponent implements OnInit {
  compassGameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private compassGameService: CompassGameService,
    private toastService: ToastrService,
    private router: Router
  ) {}

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

    this.addQuestion(true);  // Add initial horizontal question
    this.addQuestion(false); // Add initial vertical question
  }

  get questionDtos(): FormArray {
    return this.compassGameForm.get('questionDtos') as FormArray;
  }

  addQuestion(isHorizontal: boolean): void {
    this.questionDtos.push(
      this.fb.group({
        text: ['', Validators.required],
        isHorizontal: [isHorizontal],
        axisPower: [1, Validators.required]
      })
    );
  }

  removeQuestion(index: number): void {
    if(index> 1) {
      this.questionDtos.removeAt(index);
    } else {
      this.toastService.error('You can not remove the first question');
    }
  }

  submit(): void {
    if (this.compassGameForm.valid) {
      const formValue: CompassGameDto = this.compassGameForm.value;
      this.compassGameService.create(formValue).subscribe({
        next: () => {this.toastService.success('Game successfully created');
          this.router.navigate(['compass-game']);},
        error: (err) => {this.toastService.error('Error creating game:', err)}
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}
