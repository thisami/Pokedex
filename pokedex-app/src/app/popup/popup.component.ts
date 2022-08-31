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
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };

  }

  ngOnInit(): void {
  }

}
