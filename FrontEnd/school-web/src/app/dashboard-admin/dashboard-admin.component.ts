import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  currentComponent: any;

  constructor() { }

  ngOnInit(): void {
    this.currentComponent = DashboardAdminComponent;
  }

  tabIndex = 2 ;

  onTabClick(index: any){
        this.tabIndex = index;
   }

}
