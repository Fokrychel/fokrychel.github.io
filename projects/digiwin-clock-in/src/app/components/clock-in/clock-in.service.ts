import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClockInService {
  deviceID: string = '861141036515765';
  deviceType: string = 'IPHONE_8P';
  locale: string = 'zh_CN';
  menuID: string = '4369347625589622646';

  constructor(private http: HttpClient) {}

  /**
   * 获取access_token
   * */
  getAccessToken(account: string, password: string): Observable<any> {
    return this.http.get('/imgcn/oauth/oauth/token', {
      params: {
        username: account,
        password: password,
        grant_type: 'multiple',
        // 以下非必填
        userlogin: 'activate',
        locale: this.locale,
        deviceType: this.deviceType,
        deviceID: this.deviceID,
      },
    });
  }

  /**
   * 获取用户信息
   * @param access_token getAccessToken接口获取
   * */
  getUserInfo(access_token: string): Observable<any> {
    return this.http.get('/imgcn/mobile/person/current', {
      params: {
        access_token,
        // 以下非必填
        locale: this.locale,
        deviceType: this.deviceType,
        deviceID: this.deviceID,
      },
    });
  }

  /**
   * 获取打卡页面，设置cookie
   * @param access_token getAccessToken接口获取
   * */
  getPage(access_token: string): Observable<any> {
    return this.http.get('/imgcn/r/mp/attendance', {
      params: {
        access_token,
        menuID: this.menuID,
        // 以下非必填
        locale: this.locale,
        mac: this.deviceID,
      },
    });
  }

  /**
   * 打卡操作
   * @param cID 接口getUserInfo返回
   * */
  clockIn(cID): Observable<any> {
    return this.http.post('/imgcn/r/mp/sendCard', {
      mobile_token: 'd90643ab-00cc-4904-bfb1-2de6ecd8e746',
      latitude: null,
      longitude: null,
      locale: this.locale,
      cID,
      deviceId: this.deviceID,
      deviceType: this.deviceType,
      menuID: this.menuID,
      photo_dataset: '[]',
      location_desc: '',
      SSID: 'digiwin-NJ',
      BSSID: '48:57:02:76:85:f2',
      card_inner_type: 'wifi',
      check_wifi: false,
    });
  }
}
