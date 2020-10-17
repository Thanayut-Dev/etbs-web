import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const api_url = environment.apiUrl + "/api/banks/";

@Injectable({
  providedIn: 'root'
})
export class BankService implements Resolve<any> {

  routeParam: any;

  private authorizationHeader() {
    let token = environment.production ? window.localStorage.getItem(`token@${environment.appName}`) : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXNtZW1iZXIiOiJ3YWl0YXBwcm92ZSIsImZpcnN0bmFtZSI6InR5IiwibGFzdG5hbWUiOiItIiwiZW1haWwiOiJ0eUBnbWFpbC5jb20iLCJwcm9maWxlSW1hZ2VVUkwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2hmbHZsYXYwNC9pbWFnZS91cGxvYWQvdjE0ODc4MzQxODcvZzNod3lpZWI3ZGw3dWdkZ2ozdGIucG5nIiwicm9sZXMiOlsidXNlciJdLCJfaWQiOiI1ZDVkMmZlYzExZTM0MzAwMTJhMTc1MGMiLCJ1c2VybmFtZSI6InR5QGdtYWlsLmNvbSIsInJlZjEiOiItIiwicmVtYXJrcmVqZWN0dGVhbSI6W10sImhpc3RvcnlhYm91dHRlYW0iOltdLCJjcmVhdGVkIjoiMjAxOS0wOC0yMVQxMTo1MDowNC41MDNaIiwicHJvdmlkZXIiOiJsb2NhbCIsImRpc3BsYXluYW1lIjoidHkgLSIsIl9fdiI6MCwibG9naW5Ub2tlbiI6IiJ9.7i-dIE_2U4s-cdhWMLIDNcbFCtcmo5GKPKz5bDeUkqs";
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return headers;
  }

  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.routeParam = route.params
    if (this.routeParam.id) {
      if (this.routeParam.id !== 'new') {
        // console.log('id');
        return this.getDataById(this.routeParam.id);
      }
      return this.initiaiData();
    } else {
      // console.log('list');
      return this.getDataList();
    }
  }

  getDataList() {
    return this.http.get(api_url, { headers: this.authorizationHeader() })
  }

  initiaiData() {
    let body;
    return body = {
      name: "",
      image: "https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg",
      separatetype: true,
      separatechar: "",
      rows: [
        {
          rowname: "",
          rowtype: "",
          required: false,
          fields: [
            {
              fieldname: "",
              fieldtype: "string",
              fieldlength: 0,
              defaultvalue: "",
              example: ""
            }
          ]
        }
      ],
      encryptcmd: "",
      uploadcmd: "",
      maxamount: ""

    }
  }

  getDataById(id) {
    return new Promise((resolve, reject) => {
      this.http.get(api_url + id, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        resolve(res.data);
      })
    })
  }

  saveData(body): Promise<any> {
    console.log(body);
    if (!body._id) {
      // console.log("create");
      return this.createData(body);
    } else {
      // console.log("update");
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
