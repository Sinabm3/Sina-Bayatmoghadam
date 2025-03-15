import {Component, OnInit} from '@angular/core';
import {InfoCompassGameDto} from '../../dtos/compass-game';
import {CompassGameService} from '../../../service/compass-game.service';
import {NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogModule,} from '@angular/material/dialog';
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {routes} from '../../app.routes';

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
export class SearchComponent implements OnInit {
  infoCompassGames: InfoCompassGameDto[] = [];

  constructor(private readonly compassGameService: CompassGameService,
              private readonly dialog: MatDialog,
              private readonly toastService: ToastrService,
              private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.compassGameService.findAll().subscribe({
      next: (data: InfoCompassGameDto[]) => {
        this.infoCompassGames = data;
      },
      error: (error) => {
        console.error('Error fetching compass game:', error);
      }
    });
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '250px',
      data: {
        id: id,
        title: 'Delete Item',
        message: 'Please enter the password to delete this Game:',
        confirmButtonText: 'Delete',
        confirmButtonColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe((deleted) => {
        if (deleted) {
          this.infoCompassGames = this.infoCompassGames.filter(game => game.id !== id);
        }
      }
    );
  }

  openEditDialog(id: string) {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '250px',
      data: {
        id: id,
        title: 'Edit Item',
        message: 'Please enter the password to edit this Game:',
        confirmButtonText: 'Edit',
        confirmButtonColor: 'accent'
      }
    });

    dialogRef.afterClosed().subscribe((edited) => {
        if (edited) {
          this.router.navigate([`compass-game/edit/${id}`]);
        }
      }
    );
  }
}
