import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {CompassGameService} from '../../../../service/compass-game.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-password-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogContent,
    MatInput
  ],
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.css'
})
export class PasswordDialogComponent {
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private readonly compassGameService: CompassGameService,
    private toastService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    if (this.data?.title === 'Delete Item') {
      this.compassGameService.delete(this.data?.id, this.password).subscribe({
        next: () => {
          this.toastService.success("Game deleted successfully");
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastService.error("Wrong password");
        }
      });
    } else {
      this.compassGameService.checkOneByIdAndPassword(this.data?.id, this.password).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastService.error("Wrong password");
        }
      });
    }
  }
}
