import { Component, ViewChild } from '@angular/core';
import { CommunicationHelper } from './CommunicationHelper';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/Entities/Pokemon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries,
  chart: ApexChart,
  xaxis: ApexXAxis,
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {



  title = 'pokedex';

  public pokemon: Pokemon[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(PopupComponent, dialogConfig);
    dialogConfig.position = {
      'top': '0',
      left: '0'
    };
  }

  getGeneration(id: number) {
    this.pokemon.splice(0)
    const comHelper = new CommunicationHelper()
    comHelper.getGeneration(id, this.http).then((pokemon: Pokemon[]) => {
      pokemon.forEach(element => {
        this.pokemon.push(element)
      })

      this.pokemon.sort(function (a, b) {
        return a.pokeId - b.pokeId;
      });


    }).catch(() => {
      console.error("Irgendwas ging daneben...");
    })
  }



  getTypes(pokemon: Pokemon) {
    let typestring: string = ''
    pokemon.pokeTypes.forEach(element => {
      if (typestring == '') {
        typestring = typestring + element.charAt(0).toUpperCase() + element.slice(1)
      }
      else {
        typestring = typestring + ', ' + element.charAt(0).toUpperCase() + element.slice(1)
      }
    });
    return typestring
  }

}
