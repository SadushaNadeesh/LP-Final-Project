import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  tabIndex = 2 ;
  currentComponent: any;

  constructor() { }

  ngOnInit(): void {
    this.currentComponent = DashboardAdminComponent;
    this.tabIndex = 0;
  }

  

  onTabClick(index: any){
        this.tabIndex = index;
   }

}
