import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";

import { DamageRelations } from 'src/Entities/DamageRelations';
import { CommunicationHelper } from '../CommunicationHelper';
import { HttpClient } from '@angular/common/http';
import { PokemonInformation } from 'src/Entities/PokemonInformation';
import { Pokemon } from 'src/Entities/Pokemon';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  titleTwo: ApexTitleSubtitle;
  yaxis: ApexYAxis | ApexYAxis[];
};

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})


export class PopupComponent implements OnInit {
  isDataLoaded: boolean = false;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(public dialog: MatDialog, public data: Pokemon, private http: HttpClient) {
    this.chartOptions = {
      series: [
        {
          name: "x Damage to",//deals half/double/normal damage to
          data: []
        },
        {
          name: "x Damage from",
          data: []//half/double/normal damage from
        }
      ],
      chart: {
        height: 300,
        width: 1000,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart" //was anständiges hinschreiben
      },
      xaxis: {
        categories: ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dark", "Dragon", "Steel", "Fairy"]
      }
    };

  }

  damageRelation: DamageRelations = {} as DamageRelations

  ngOnInit(): void {
    const typeHelper = new CommunicationHelper()

    const dataEffective = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


    const dataArray = [];
    this.data.pokeTypes.forEach(element => {
      typeHelper.getEffectivity(element, this.http).then((damageRelations: DamageRelations) => {

        console.log(damageRelations)
        this.damageRelation = damageRelations

        damageRelations.doubleDamageFrom.forEach(doubleDamageElement => {
          const index = this.chartOptions.xaxis.categories.findIndex((element: any) => element == doubleDamageElement.charAt(0).toUpperCase() + doubleDamageElement.slice(1))

          console.log(index);

          if (index != -1) {
            dataEffective[index] = 2
          }

          damageRelations.halfDamageFrom.forEach(halfDamageElement => {
            const index = this.chartOptions.xaxis.categories.findIndex((element: any) => element == halfDamageElement.charAt(0).toUpperCase() + halfDamageElement.slice(1))

            console.log(index);

            if (index != -1) {
              dataEffective[index] = 0.5
            }


            damageRelations.noDamageFrom.forEach(noDamageElement => {
              const index = this.chartOptions.xaxis.categories.findIndex((element: any) => element == noDamageElement.charAt(0).toUpperCase() + noDamageElement.slice(1))

              console.log(index);

              if (index != -1) {
                dataEffective[index] = 0
              }


            });

          })
          this.chartOptions.series[0].data = dataEffective
          this.chartOptions.series[1].data = dataEffective
          this.isDataLoaded = true;
        })
      }
      )
    }
    )


    //this.chartOptions.series[0].data.push(1) -> damageFrom
    //this.chartOptions.series[1].data.push(1) -> damageTo
    // 1.ich mach ein array das insagesamt 18 Einser hat --> die Kategporien 
    // 2. iteration über doubleDamageFrom, halfDamageFrom, noDamageFrom
    // 3. prüfen: index aktuelles Element in categories (this.chartOptions.xaxis.categories --> bekommst index zurück
    //4. Array unter 1 erstellt an position von 3. = 2 
    //alle vier schritte für half mit 0,5 
    //alle vier schritte für half mit 0  
  }





  displayTypes() {



    let typeString = "";
    this.data.pokeTypes.forEach(element => {
      typeString != "" ? typeString = typeString + ", " + element.charAt(0).toUpperCase() + element.slice(1) : typeString = element.charAt(0).toUpperCase() + element.slice(1)




    });

    return typeString;




  }
}