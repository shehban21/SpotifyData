import { Component, OnInit } from '@angular/core';
import vegaEmbedModule from 'vega-embed';
import { TopLevelSpec, Config } from 'vega-lite';
import { LoginServiceService } from '../Services/login-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-most-played-genres',
  templateUrl: './most-played-genres.component.html',
  styleUrls: ['./most-played-genres.component.scss']
})
export class MostPlayedGenresComponent implements OnInit {

  constructor(private login: LoginServiceService, private dataService:DataService) { }

  ngOnInit(): void {
    this.getGenreData();
  }

  recentArray: any[] = [];
  user_id!: string | null;
  playlistArray: any[] = [];
  dropdownSettings:IDropdownSettings = {};

  getGenreData() {
    this.dataService.getGenreData().subscribe(res => {
      this.recentArray = res.data;
      let genre: any[] = res.data;
      for (let x in genre) {
        genre[x].genre = this.capitalizeFirstLetter(genre[x].genre);
      }
      const vegaLiteSpec: TopLevelSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        width: "container",
        height: { step: 75 },
        data: {
          values: this.recentArray
        },
        encoding: {
          y: {
            field: 'genre',
            type: 'nominal',
            axis: null,
            sort: { 'order': 'descending' }
          },
        },
        layer: [
          {
            mark: { type: "bar", cornerRadiusEnd: 5 },
            encoding: {
              x: {
                field: "count",
                type: 'quantitative',
                title: "Number of Plays"
              }
            }
          }, {
            mark: { type: "text", align: "left", x: 5, style: 'label', fontSize: 20 },
            encoding: {
              text: { field: "genre" },
              color: {
                value: '#fff'
              }
            }
          }]
      };

      const config: Config = {
        background:'#fff',
        bar: {
          color: 'rgba(22,76,37,1)',
        },
        legend: {
          labelColor:'#fff',
          fillColor:'#fff'
        }
      };

      vegaEmbedModule("#vis", vegaLiteSpec, { config });
    }
    )
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
