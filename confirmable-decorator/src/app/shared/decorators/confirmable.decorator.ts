import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SimpleDialogComponent} from "../../components/simple-dialog/simple-dialog.component";
import {AppModule} from "../../app.module";
import {Type} from "@angular/core";

export interface ConfirmableDecoratorOptions {

  title?: string
  text?: string
}


// Confirmable is now a factory function, with an optional parameter object
export function Confirmable() {

  // our factory function will return our actual decorator function, but now we have
  // an actual options object to configure our alert box :)
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    // the usual, caching the original implementation
    const originalMethod = descriptor.value;
    // default values for our config, we’ll overwrite this with our options parameter
    const config: ConfirmableDecoratorOptions = {
      title: "Bestätigung erforderlich", text: "Sind sie sicher, dass Sie das tuen wollen?"
    }

    // from here it’s the same as before. We write the new implementation
    descriptor.value = async function (...args: any[]) {
      // ask for confirmation
      const dialog: MatDialog = AppModule.INJECTOR.get<MatDialog>(MatDialog as Type<MatDialog>)
      const dialogRef: MatDialogRef<SimpleDialogComponent> = dialog.open(SimpleDialogComponent, {
        data: {
          title: config.title,
          text: config.text
        }
      });


      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          // run original implementation if user confirms
          return originalMethod.apply(this, args);
        }
      })
    };
    return descriptor;

  };

}
