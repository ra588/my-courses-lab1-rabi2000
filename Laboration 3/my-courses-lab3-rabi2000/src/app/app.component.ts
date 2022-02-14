import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageInfoService = {
    heading: "Mittuniversitetets kursutbud",
    text: "Följande kurser finns att läsa hos oss:",
    dataSourceLink: "https://my-courses-lab2-rabi2000.herokuapp.com/api/courses",
    dataSourceName: "api/courses"
  }
}
