import { Component, OnInit } from '@angular/core';
import { ClockInService } from './clock-in.service';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.less'],
  providers: [ClockInService]
})
export class ClockInComponent implements OnInit {
  account: string;
  password: string;
  errorMsg: string;

  constructor(private clockInService: ClockInService) {}

  ngOnInit(): void {}

  clockIn(): void {
    this.clockInService.getAccessToken(this.account, this.password).subscribe((res) => {
      console.log(res);
    });
  }
}
