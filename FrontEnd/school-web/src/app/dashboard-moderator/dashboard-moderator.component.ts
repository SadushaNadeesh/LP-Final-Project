import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-moderator',
  templateUrl: './dashboard-moderator.component.html',
  styleUrls: ['./dashboard-moderator.component.scss']
})
export class DashboardModeratorComponent implements OnInit {

  currentComponent: any;

  constructor() { }

  ngOnInit(): void {
    this.currentComponent = DashboardModeratorComponent;
    this.tabIndex = 0;
  }

  tabIndex: number= 6 ;

  onTabClick(index: any){
        this.tabIndex = index;
   }

}
