import { Component } from '@angular/core';
let addresses = ["A","Baa", "dd"];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test2';
  public addresses = addresses;
  public selectChange(val:any) {
    console.log("val ",val);
  }
}
