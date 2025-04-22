import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-component',
  templateUrl: './most-played-by-artist.component.html',
})
export class MostPlayedByArtistComponent {
  constructor(public dialogRef: MatDialogRef<MostPlayedByArtistComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(): void {
    this.dialogRef.close();
  }
}
