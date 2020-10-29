import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


const api_url = environment.apiUrl + '/';
const api_url_template = environment.apiUrltest + "/";

@Injectable({
  providedIn: 'root'
})
export class SourceService implements Resolve<any> {

  routeParam: any;

  private authorizationHeader() {
    let token = environment.production ? window.localStorage.getItem(`token@${environment.appName}`) : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXNtZW1iZXIiOiJ3YWl0YXBwcm92ZSIsImZpcnN0bmFtZSI6InR5IiwibGFzdG5hbWUiOiItIiwiZW1haWwiOiJ0eUBnbWFpbC5jb20iLCJwcm9maWxlSW1hZ2VVUkwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2hmbHZsYXYwNC9pbWFnZS91cGxvYWQvdjE0ODc4MzQxODcvZzNod3lpZWI3ZGw3dWdkZ2ozdGIucG5nIiwicm9sZXMiOlsidXNlciJdLCJfaWQiOiI1ZDVkMmZlYzExZTM0MzAwMTJhMTc1MGMiLCJ1c2VybmFtZSI6InR5QGdtYWlsLmNvbSIsInJlZjEiOiItIiwicmVtYXJrcmVqZWN0dGVhbSI6W10sImhpc3RvcnlhYm91dHRlYW0iOltdLCJjcmVhdGVkIjoiMjAxOS0wOC0yMVQxMTo1MDowNC41MDNaIiwicHJvdmlkZXIiOiJsb2NhbCIsImRpc3BsYXluYW1lIjoidHkgLSIsIl9fdiI6MCwibG9naW5Ub2tlbiI6IiJ9.7i-dIE_2U4s-cdhWMLIDNcbFCtcmo5GKPKz5bDeUkqs";
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return headers;
  }

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.routeParam = route.params;

    if (this.routeParam.id || this.routeParam.dataId) {
      if (this.routeParam.id !== 'new') {
        return this.getDataById(this.routeParam.id);
      }
      return this.getDataTemplateById(this.routeParam.dataId);
    } else {
      return this.getDataList();
    }
  }

  // get id in template
  getDataTemplateById(id) {
    return new Promise((resolve, reject) => {
      this.http.get(api_url_template + id, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        resolve(res.data);
      })
    })
  }

  getDataList() {
    return this.http.get(api_url, { headers: this.authorizationHeader() })
  }

  // initiaiData() {
  //   let body;
  //   return body = {
  //     name: "",
  //     template: {
  //       _id: "",
  //       name: "",
  //       separatetype: false,
  //       separatechar: ""
  //     },
  //     datasource: {
  //       driver: "",
  //       host: "",
  //       database: "",
  //       username: "",
  //       password: ""
  //     },
  //     rows: [
  //       {
  //         name: "",
  //         rowtype: "",
  //         required: true,
  //         groupby: [
  //           ""
  //         ],
  //         fields: [
  //           {
  //             name: "",
  //             fieldtype: "",
  //             length: 1,
  //             datafieldname: "",
  //             required: true,
  //             sum: "",
  //             count: "",
  //             formula: "",
  //             seq: 1
  //           }
  //         ]
  //       }
  //     ],
  //     encrypt: false,
  //     upload: false,
  //     limitamount: false,
  //     encryptcmd: "",
  //     uploadcmd: "",
  //     maxamount: 200
  //   }
  // }

  getDataById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(api_url + id, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        resolve(res.data);
      })
    })
  }

  saveData(body): Promise<any> {
    if (!body._id) {
      return this.createData(body);
    } else {
      return this.updateData(body);
    }
  }

  createData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(api_url, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        resolve(res.data);
      }, reject);
    })
  }
  updateData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(api_url + body._id, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        resolve(res.data);
      }, reject);
    })
  }

  deleteData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(api_url + body._id, { headers: this.authorizationHeader() })
        .subscribe((res: any) => {
          resolve(res.data);
        }, reject);
    });
  }

}
