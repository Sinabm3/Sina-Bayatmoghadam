import {Component, OnInit} from '@angular/core';
import {InfoCompassGameDto} from '../../dtos/compass-game';
import {CompassGameService} from '../../../service/compass-game.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogModule,} from '@angular/material/dialog';
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatButtonToggle,
    MatButton,
    MatDialogModule,
    MatCardActions
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  infoCompassGames: InfoCompassGameDto[] = [];
  constructor(private readonly compassGameService: CompassGameService,
              private readonly dialog: MatDialog,
              private readonly toastService: ToastrService,
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

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Item',
        message: 'Please enter the password to delete this Game:',
        confirmButtonText: 'Delete',
        confirmButtonColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.compassGameService.delete(id, result).subscribe({
          next: () => {
            // Remove the deleted item from the array
            this.toastService.success("Game deleted successfully");
            this.infoCompassGames = this.infoCompassGames.filter(game => game.id !== id);
          }
        });
      }
    });
  }
}
