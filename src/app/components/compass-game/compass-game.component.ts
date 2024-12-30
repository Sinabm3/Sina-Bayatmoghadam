import {Component, OnInit} from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatSlider} from '@angular/material/slider';
import {CompassGameDto, QuestionDto} from '../../dtos/compass-game';
import {CompassGameService} from '../../../service/compass-game.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-compass-game',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    MatProgressBar,
    MatSlider
  ],
  templateUrl: './compass-game.component.html',
  styleUrl: './compass-game.component.css'
})
export class CompassGameComponent implements OnInit {

  compassGame?: CompassGameDto;
  questions: QuestionDto[] = [];
  currentQuestionIndex = 0;
  xScore = 0;
  yScore = 0;
  gameOver = false;
  xPosition = 0;
  yPosition = 0;
  id = 0;
  totalX = 0;
  totalY = 0;
  constructor(private compassGameService: CompassGameService,
              private route: ActivatedRoute
              ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
    });
    this.compassGameService.findOneById(this.id).subscribe({
      next: (data: CompassGameDto) => {
        this.compassGame = data;
        console.log('Fetched compass game:', data);
        // Extract questions from response
        this.questions = data.questionDtos ?? [];
      },
      error: (error) => {
        console.error('Error fetching compass game:', error);
      }
    });
  }

  answerQuestion(value: number): void {
    if (!this.questions || this.currentQuestionIndex >= this.questions.length) {
      return;
    }

    const question = this.questions[this.currentQuestionIndex];
    if (question.isHorizontal) {
      this.xScore += question.axisPower * value;
    } else {
      this.yScore += question.axisPower * value;
    }

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.calculatePosition();
      this.gameOver = true;
    }
  }

  calculatePosition(): void {
    this.totalX = this.questions.filter(q => q.isHorizontal).length;
    this.totalY = this.questions.filter(q => !q.isHorizontal).length;
    this.xPosition = (( this.xScore+this.totalX) * 100/(2*this.totalX));
    this.yPosition = ((this.yScore*-1)+this.totalY)* 100/(2*this.totalY);
  }
}
