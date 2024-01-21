import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../components/simple-dialog/simple-dialog.component';
import {Type} from '@angular/core';
import {AppComponent} from "../../app.component";
import {Decorator} from "./decorator";

export interface ConfirmableDecoratorOptions {
  title?: string;
  text?: string;
}

export function Confirmable(): Decorator {
  return (
    _target: Object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const config: ConfirmableDecoratorOptions = {
      title: 'Confirmation needed',
      text: 'Are you sure?',
    };

    descriptor.value = async function (...args: any[]) {
      const dialog: MatDialog = AppComponent.injector.get<MatDialog>(
        MatDialog as Type<MatDialog>
      );
      const dialogRef: MatDialogRef<SimpleDialogComponent> = dialog.open(
        SimpleDialogComponent,
        {
          data: {
            title: config.title,
            text: config.text,
          },
        }
      );

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          return originalMethod.apply(this, args);
        }
      });
    };
    return descriptor;
  };
}
