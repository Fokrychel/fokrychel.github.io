import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ClockInService {
  constructor(private http: HttpClient) {}

  /**
   * 获取access_token
   * */
  getAccessToken(account: string, password: string): Observable<any> {
    return this.http.get('imgcn.digiwin.com:18090/oauth/oauth/token', {
      params: {
        username: account,
        password: password,
        grant_type: 'multiple',
        // 以下非必填
        userlogin: 'activate',
        locale: 'zh_CN',
        deviceType: 'IPHONE_8P',
        deviceID: '861141036515765',
      }
    })
  }
}
