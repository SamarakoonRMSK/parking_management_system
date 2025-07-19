import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IBuilding, IFloor, IRelese, ISite, Parking, ResponseModel } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, NgIf],
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
  bookedSpotList :any[] = []
  bookSpotObj:Parking= new Parking()
  releseObj: IRelese = {
    parkId: 0,
    outTime: new Date(),
    extraCharge: 0
  }
  available:number=0;
  occupied:number=0;

  @ViewChild("bookSpot") bookModel!: ElementRef;
  @ViewChild("releaseSpotModal") bookReleaseModel!: ElementRef   

  ngOnInit(): void {
    this.getSites();
  }

  openModel(spotNo:number){
    this.bookSpotObj = {
    parkId: 0,
    floorId: this.floorId,
    custName: '',
    custMobileNo: '',
    vehicleNo: '',
    parkDate: new Date(),
    parkSpotNo: spotNo,
    inTime: new Date(),
    outTime: null,
    amount: 0,
    extraCharge: 0,
    parkingNo: ''
  }
    if(this.bookModel){
      this.bookModel.nativeElement.style.display = 'block'
    }
  }
  openReleseModel(spotNo:number){
    this.releseObj.parkId = spotNo;
    if(this.bookReleaseModel){
      this.bookReleaseModel.nativeElement.style.display = 'block'
    }
  }
  closeReleseModel(){
    if(this.bookReleaseModel){
      this.bookReleaseModel.nativeElement.style.display = ''
    }
  }

  closeModel(){
    if(this.bookModel){
      this.bookModel.nativeElement.style.display = ''
    }
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
    this.parkingSpotArray = [];
    this.floorList = [];
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
    this.parkingSpotArray = [];
    this.floorList = [];
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
    this.parkingSpotArray = [];
    this.bookedSpotList = []
    const floor = this.floorList.find((m: IFloor) => m.floorId == this.floorId);
    if (!floor) {
      console.warn('Selected floor not found.');
      return;
    }
    for (let index = 1; index <= floor.totalParkingSpots; index++) {
      this.parkingSpotArray.push(index);
    }
    this.getBooking();
    
  }

  getBooking(){
    this.masterSrv.getALLParkingByFloor(this.floorId).subscribe({
      next:(res)=>{
        this.bookedSpotList = res.data;
        // this.occupied = )
        for (let index = 1; index <= this.parkingSpotArray.length; index++) {
          const isExist = res.data.find((m: { parkSpotNo: number; outTime: null; })=>m.parkSpotNo == index && m.outTime == null );
          if(isExist != undefined){
            this.occupied+=1
          }
          
        }
        this.available = this.parkingSpotArray.length - this.occupied;
      }
    })
  }


  onBookSpot(){
    this.masterSrv.bookSpot(this.bookSpotObj).subscribe({
      next:(res)=>{
        alert("Spot booked");
        this.getBooking();
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  onReleseSpot(){
    this.masterSrv.releseSpot(this.releseObj).subscribe({
      next:(res)=>{
        alert("spot relesed");
        this.getBooking();
      }
    })
  }

  chechSpotBooked(spotNo:number){
    const isExist = this.bookedSpotList.find(m=>m.parkSpotNo == spotNo && m.outTime == null );
    console.log(isExist);
    
    if(isExist != undefined){
      return isExist;
    }else{
      return isExist;
    }
  }

}
