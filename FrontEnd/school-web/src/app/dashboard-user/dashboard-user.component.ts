import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  tabIndex: number= 6 ;
  currentComponent: any;

  constructor() { }

  ngOnInit(): void {
    this.currentComponent = DashboardUserComponent;
    this.tabIndex = 0;
  }

  onTabClick(index: any){
        this.tabIndex = index;
   }

}
