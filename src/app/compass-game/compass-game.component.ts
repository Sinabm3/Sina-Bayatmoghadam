import { Component } from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatSlider} from '@angular/material/slider';
interface Question {
  text: string;
  empathyAxis: number;
  collectivistAxis: number;
}
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
export class CompassGameComponent {

  questions: Question[] = [
    { text: 'If someone cannot afford food or shelter, they should still have access to it.', empathyAxis: 1, collectivistAxis: 0},
    { text: 'If my child disagrees with my most important moral values, I will continuously try to change their mind.', empathyAxis: 0, collectivistAxis: 1 },
    { text: 'Charity is more effective in improving healthcare than nationalizing the healthcare system.', empathyAxis: 0, collectivistAxis: -1 },
    { text: 'A company should always have the right to choose who they serve, even if it is based on arbitrary factors like race or religion.', empathyAxis: -1, collectivistAxis: 0 },
    { text: 'You should never negotiate with people you view as terrorists.', empathyAxis: -1, collectivistAxis: 0 },
    { text: 'It is acceptable to kill civilians if you are also targeting people you view as terrorists.', empathyAxis: -1, collectivistAxis: 0 },
    { text: 'Higher education is a commodity, not a human right, and therefore should not be free.', empathyAxis: -1, collectivistAxis: 0},
    { text: 'To protect free speech, all forms of insults and slurs should be legalized.', empathyAxis: -1, collectivistAxis: 0 },
    { text: 'The purpose of imprisonment should only be rehabilitation, not punishment.', empathyAxis: 1, collectivistAxis: 0},
    { text: 'The death penalty is sometimes justified.', empathyAxis: -1, collectivistAxis: 0},
    { text: 'The community\'s needs should always come before individual needs.', empathyAxis: 0, collectivistAxis: 1 },
    { text: 'It is more important to work for the betterment of society than for personal success.', empathyAxis: 0, collectivistAxis: 1 },
    { text: 'Rich people should pay higher taxes if it means better public services for everyone.', empathyAxis: 0, collectivistAxis: 1 },
    { text: 'A doctor and a farmer should get paid the same in a world, where education is free and comfortable.', empathyAxis: 0, collectivistAxis: 1 },
    { text: 'Working for another company is a better option than trying to change the company you currently work at.', empathyAxis: 0, collectivistAxis: -1 },
    { text: 'People who hate the actions of their country should just move to another country.', empathyAxis: 0, collectivistAxis: -1 },
    { text: 'Public health should be prioritized over individual freedoms during a pandemic.', empathyAxis: 0, collectivistAxis: 1 },
    { text: 'Racial profiling is always wrong, even if it is based on statistics.', empathyAxis: 1, collectivistAxis: 0 },
    { text: 'Deporting foreigners back to war zones is never justified.', empathyAxis: 1, collectivistAxis: 0 },
    { text: 'Foreigners should try to integrate and assimilate.', empathyAxis: 0, collectivistAxis: 1 }
  ];

  currentQuestionIndex = 0;
  empathyScore = 0;
  collectivistScore = 0;
  gameOver = false;
  xPosition = 50;  // x-axis (collectivist vs. individualist)
  yPosition = 50;  // y-axis (empathy vs. apathy)

  answerQuestion(value: number): void {
    const question = this.questions[this.currentQuestionIndex];
    this.empathyScore += question.empathyAxis * value;
    this.collectivistScore += question.collectivistAxis * value;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.calculatePosition();
      this.gameOver = true;
    }
  }

  calculatePosition(): void {
    // Normalize to percentage for compass positioning (assuming -5 to 5 possible score range)
    this.xPosition = ((this.questions.length/2 - this.empathyScore) / this.questions.length) * 100;
    this.yPosition = ((this.questions.length/2 + this.collectivistScore) / this.questions.length) * 100;
  }
}
