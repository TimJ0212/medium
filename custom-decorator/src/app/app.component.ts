import {Component, Inject, Injector} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Confirmable} from "./shared/decorators/confirmable.decorator";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'custom-decorator';

  static injector: Injector;

  constructor(injector: Injector) {
    AppComponent.injector = injector;
  }

  @Confirmable()
  public doSomething(): void {
    console.log("Done something")
  }
}
