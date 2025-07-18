import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ISite, ResponseModel } from '../../model/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  masterSrv = inject(MasterService)
  siteList: ISite[] = []

  ngOnInit(): void {
    this.getSites();
  }

  getSites(){
    this.masterSrv.getSitesByClientId().subscribe({
      next:(res:ResponseModel)=>{
        this.siteList = res.data;
      },
      error:(error)=>{

      }
    })
  }

}
