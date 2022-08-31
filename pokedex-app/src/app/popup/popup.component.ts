import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})


export class PopupComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(public dialog: MatDialog) {
    this.chartOptions = {
      series: [
        {
          name: "x Damage to",//deals half/double/normal damage to
          data: [0.5, 1, 1.5, 2]
        },
        {
          name: "x Damage from",
          data: [0.5, 1, 1.5, 2, 1.5, 1, 2, 0, 1.5, 2, 1]//half/double/normal damage from
        }
      ],
      chart: {
        height: 300,
        width: 700,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart" //was anständiges hinschreiben
      },
      xaxis: {
        categories: ["Ground", "Water", "Grass", "Ice", "Poison", "Rock", "Steel", "Fire", "Electric", "Bug", "Flying"]
      }
    };

  }

  ngOnInit(): void {
  }

}
