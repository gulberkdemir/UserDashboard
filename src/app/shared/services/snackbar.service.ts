import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {


  public static readonly ERROR = 'error';
  public static readonly INFO = 'info';
  public static readonly SUCCESS = 'success';
  public static readonly SHORT_DURATION = 2000;
  private readonly LONG_DURATION = 5000;

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(message: string, alertClass: string) {
    let panelClass;
    switch (alertClass) {
      case SnackbarService.SUCCESS:
        panelClass = ['alert-success'];
        break;
      case SnackbarService.INFO:
        panelClass = ['alert-info'];
        break;
      default:
        panelClass = ['alert-error'];
        break;
    }

    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: panelClass,
    });
  }
}
