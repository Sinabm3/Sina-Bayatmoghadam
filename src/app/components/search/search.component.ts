import {Component, OnInit} from '@angular/core';
import {InfoCompassGameDto} from '../../dtos/compass-game';
import {CompassGameService} from '../../../service/compass-game.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButtonToggle} from '@angular/material/button-toggle';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatButtonToggle
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  infoCompassGames: InfoCompassGameDto[] = [];
  constructor(private compassGameService: CompassGameService,
  ) {}
  ngOnInit(): void {
    this.compassGameService.findAll().subscribe({
    next: (data: InfoCompassGameDto[]) => {
      this.infoCompassGames = data;
    },
      error: (error) => {
        console.error('Error fetching compass game:', error);
      }});
  }
}
