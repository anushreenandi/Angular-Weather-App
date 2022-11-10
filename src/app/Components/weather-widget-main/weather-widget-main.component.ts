import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData:any;
  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=siliguri&appid=f3b90ca8ebaf03fd60fc3ba19019da34')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":88.4333,"lat":26.7},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":301.35,"feels_like":301.55,"temp_min":301.35,"temp_max":301.35,"pressure":1013,"humidity":47,"sea_level":1013,"grnd_level":999},"visibility":10000,"wind":{"speed":2.16,"deg":218,"gust":1.63},"clouds":{"all":0},"dt":1668065612,"sys":{"country":"IN","sunrise":1668039706,"sunset":1668079117},"timezone":19800,"id":1256525,"name":"Siliguri","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}