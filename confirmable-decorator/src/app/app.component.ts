import { Component } from '@angular/core';
import { Confirmable } from './shared/decorators/confirmable.decorator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public confirmed: boolean = false;

  @Confirmable()
  public doSomething(): void {
    this.confirmed = true;
  }
}
