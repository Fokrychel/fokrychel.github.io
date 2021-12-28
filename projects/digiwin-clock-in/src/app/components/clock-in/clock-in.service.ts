import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClockInService {
  deviceID: string = '861141036515765';
  deviceType: string = 'IPHONE_8P';
  locale: string = 'zh_CN';
  menuID: string = '4369347625589622646';

  constructor(private http: HttpClient, private jsonp: JsonpClientBackend) {}

  /**
   * 获取access_token
   * https://www.freesion.com/article/9227204075/
   * */
  getAccessToken(account: string, password: string): Observable<any> {
    const authUsername = 'esnMobileClient';
    const authPassword = 'esnMobile';
    const authBase64Info = window.btoa(`${authUsername}:${authPassword}`)
    return this.http.get('/imgcn/oauth/oauth/token', {
    // return this.http.get('imgcn.digiwin.com:18090/oauth/oauth/token', { // 有跨域问题，接口没有设置跨域头
    // return this.http.jsonp('imgcn.digiwin.com:18090/oauth/oauth/token', { // 接口不支持返回jsonp格式
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
      headers: {
        Authorization: `Basic ${authBase64Info}`
      }
    });
  }

  /**
   * 获取用户信息
   * @param access_token getAccessToken接口获取
   * */
  getUserInfo(access_token: string): Observable<any> {
    return this.http.get('/imgcn/mobile/person/current', {
    // return this.http.get('imgcn.digiwin.com:18090/mobile/person/current', {
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
    // return this.http.get('imgcn.digiwin.com:18090/r/mp/attendance', {
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
    // return this.http.post('imgcn.digiwin.com:18090/r/mp/sendCard', {
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
