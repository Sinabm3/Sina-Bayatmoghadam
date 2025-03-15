import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompassGameService} from '../../../service/compass-game.service';
import {CompassGameDto} from '../../dtos/compass-game';
import {MatError, MatFormField, MatLabel, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-compass-game-edit',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatButton,
    NgForOf,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatRadioButton,
    MatRadioGroup,
    NgIf,
    MatSelect,
    MatOption,
    MatIcon,
    MatPrefix
  ],
  templateUrl: './compass-game-edit.component.html',
  styleUrl: './compass-game-edit.component.css'
})
export class CompassGameEditComponent implements OnInit {
  compassGameForm!: FormGroup;
  originalCompassGame!: CompassGameDto;
  id: number = 0;
  numberHorizontalQuestions: number = 0;
  numberVerticalQuestions: number = 0;

  constructor(
    private fb: FormBuilder,
    private compassGameService: CompassGameService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
    });
    this.compassGameService.findOneById(this.id).subscribe({
      next: (data: CompassGameDto) => {
        this.originalCompassGame = data;
        this.initializeForm();
      },
      error: (error) => {
        console.error('Error fetching compass game:', error);
      }
    });
  }

  initializeForm(): void {
    this.compassGameForm = this.fb.group({
      name: [this.originalCompassGame.name, Validators.required],
      password: ['', Validators.required],
      newPassword: [''],
      horizontalAxisPositiveName: [this.originalCompassGame.horizontalAxisPositiveName, Validators.required],
      horizontalAxisNegativeName: [this.originalCompassGame.horizontalAxisNegativeName, Validators.required],
      verticalAxisPositiveName: [this.originalCompassGame.verticalAxisPositiveName, Validators.required],
      verticalAxisNegativeName: [this.originalCompassGame.horizontalAxisNegativeName, Validators.required],
      questionDtos: this.fb.array([])
    });
    this.compassGameForm.get('password')?.markAsTouched();
    for (const question of this.originalCompassGame.questionDtos) {
      this.questionDtos.push(
        this.fb.group({
          text: [question.text, Validators.required],
          isHorizontal: [question.isHorizontal, Validators.required],
          axisPower: [question.axisPower, Validators.required]
        })
      );
      if (question.isHorizontal) {
        this.numberHorizontalQuestions++;
      } else {
        this.numberVerticalQuestions++;
        }
    }
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
    const editedGame: CompassGameDto = this.compassGameForm.value;
    const password:string = this.compassGameForm.get('password')?.value as string;
    const newPassword:string = this.compassGameForm.get('newPassword')?.value as string;
    if(newPassword !== ''){
      editedGame.password = newPassword;
    }
    this.compassGameService.edit(this.id.toString(),editedGame,password).subscribe({
      next: () => {
        this.toastService.success('Game successfully edited');
        this.router.navigate(['compass-game']);
      },
      error: (err) => {
        this.toastService.error('Error editing game:', err.error());
      }
    });
  }

  questionTypeCanBeChanged(isHorizontal: boolean, willBeHorizontal: boolean): boolean {
    if (isHorizontal && !willBeHorizontal) {
      return this.numberHorizontalQuestions > 1;
    }
    if (!isHorizontal && willBeHorizontal) {
      return this.numberVerticalQuestions > 1;
    }
    return true;
  }

  changeLabel(value: boolean) {
    this.numberHorizontalQuestions = value ? this.numberHorizontalQuestions + 1 : this.numberHorizontalQuestions - 1;
    this.numberVerticalQuestions = value ? this.numberVerticalQuestions - 1 : this.numberVerticalQuestions + 1;
  }

  questionTypeCanBeDeleted(isHorizontal: boolean) {
    return this.questionTypeCanBeChanged(isHorizontal, !isHorizontal);
  }
}
