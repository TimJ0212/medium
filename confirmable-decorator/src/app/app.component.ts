import { Component } from '@angular/core';
import { Confirmable } from './shared/decorators/confirmable.decorator';

@Component({
  selector: 'app-root',
  template: `<button (click)="doSomething()" color="primary" mat-raised-button>
      Do Something
    </button>
    <div>{{ this.confirmed }}</div> `,
})
export class AppComponent {
  public confirmed: boolean = false;

  @Confirmable()
  public doSomething(): void {
    this.confirmed = true;
  }
}
