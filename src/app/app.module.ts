import { RestService } from './rest.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent} from './home/home.component';
import { ViewStationComponent } from './view-station/view-station.component';

import { AmChartsModule } from "@amcharts/amcharts3-angular";

import { routing } from './app.routing';
import { GenerateModelComponent } from './generate-model/generate-model.component';
import { EtComponent } from './et/et.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ViewStationComponent,
    GenerateModelComponent,
    EtComponent,
    GraphicsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AmChartsModule,
    routing
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
