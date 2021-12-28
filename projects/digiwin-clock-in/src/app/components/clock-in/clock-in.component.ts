import { Component, OnInit } from '@angular/core';
import { ClockInService } from './clock-in.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.less'],
  providers: [ClockInService, NzMessageService],
})
export class ClockInComponent implements OnInit {
  account: string;
  password: string;
  errorMsg: string;
  isClockIn: boolean = false;
  accessToken: string;
  cId: string;

  constructor(private clockInService: ClockInService, private nzMsgService: NzMessageService) {}

  ngOnInit(): void {}

  go(): void {
    this.isClockIn = true;
    this.clockInService
      .getAccessToken(this.account, this.password)
      .pipe(
        mergeMap((tokenRes): Observable<any> => {
          this.accessToken = tokenRes?.access_token;
          if ([undefined, null, ''].includes(this.accessToken)) {
            return;
          }
          return this.clockInService.getUserInfo(this.accessToken).pipe(
            mergeMap((userRes): Observable<any> => {
              this.cId = userRes?.cID;
              return this.clockInService.getPage(this.accessToken);
            })
          );
        })
      )
      .subscribe(
        (res) => {
            console.log(res);
         this.doClockIn();
        },
        (err): void => {
          console.log(err);
            this.doClockIn();
        }
      );
  }

  /**
   * 调打卡接口
   * */
  doClockIn(): void {
      this.clockInService.clockIn(this.cId).subscribe((): void => {
          this.nzMsgService.success('打卡成功');
          this.isClockIn = false;
      }, (): void => {
          this.isClockIn = false;
      });
  }
}
