import { Component } from '@angular/core';

export interface StringGenerator{
  time: string,
  string: string,
  bonus: string,
  color: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Title"
  
}

