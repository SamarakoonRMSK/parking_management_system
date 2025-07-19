import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IBuilding, IFloor, ISite, ResponseModel } from '../../model/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  masterSrv = inject(MasterService)
  siteList: ISite[] = []
  buildingList: IBuilding[] = []
  floorList: IFloor[] = []
  siteId:number = 0; 
  buildingId:number = 0;
  floorId:number = 0;
  parkingSpotArray:number[] = []

  ngOnInit(): void {
    this.getSites();
  }

  getSites(){
    this.masterSrv.getSitesByClientId().subscribe({
      next:(res:ResponseModel)=>{
        this.siteList = res.data;
      },
      error:(error)=>{
          console.log(error);
      }
    })
  }

  getBuilding(){
    this.masterSrv.getBuildingBySiteId(this.siteId).subscribe({
      next:(res)=>{
        this.buildingList = res.data;
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
  getFloors(){
    this.masterSrv.getFloorsByBuildingId(this.buildingId).subscribe({
      next:(res)=>{
        this.floorList = res.data;
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  onFloorSelect(){
    const floor = this.floorList.find((m: IFloor) => m.floorId == this.floorId);
    if (!floor) {
      console.warn('Selected floor not found.');
      return;
    }
    for (let index = 1; index <= floor.totalParkingSpots; index++) {
      this.parkingSpotArray.push(index);
    }
  }

}
