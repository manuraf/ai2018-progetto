import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient) {}

  public loadAppConfig() {
    return this.http.get('./assets/runtime.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  getConfig() {
    return this.appConfig;
  }

}
