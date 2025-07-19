import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRelese, Parking, ResponseModel } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  userSrv = inject(UserService);

  constructor(private http:HttpClient) { }

  getSitesByClientId(): Observable<ResponseModel>{
     const clientId: number = this.userSrv.loggedUserData.extraId;
    return this.http.get<ResponseModel>("https://api.freeprojectapi.com/api/SmartParking/GetSitesByClientId?id=2");
  }

  getBuildingBySiteId(siteId:number):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`https://api.freeprojectapi.com/api/SmartParking/GetBuildingBySiteId?id=${siteId}`);
  }
  
  getFloorsByBuildingId(buildingId:number):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`https://api.freeprojectapi.com/api/SmartParking/GetFloorsByBuildingId?id=${buildingId}`);
  }

  bookSpot(obj:Parking):Observable<ResponseModel>{
    return this.http.post<ResponseModel>("https://api.freeprojectapi.com/api/SmartParking/AddParking",obj);
  }

  getALLParkingByFloor(floorId:number):Observable<ResponseModel>{
    return this.http.get<ResponseModel>("https://api.freeprojectapi.com/api/SmartParking/GetAllParkingByFloor?id="+floorId);
  }

  releseSpot(obj:IRelese):Observable<ResponseModel>{
    return this.http.post<ResponseModel>("https://api.freeprojectapi.com/api/SmartParking/MarExit",obj);
  }
}
