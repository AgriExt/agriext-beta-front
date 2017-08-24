import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GenerateModelComponent } from './generate-model/generate-model.component';
import { EtComponent } from './et/et.component';

const APP_ROUTING: Routes = [
  {path: '', redirectTo:'inicio', pathMatch:"full"},
  {path : 'inicio', component: HomeComponent},
  {path : 'modelo', component: GenerateModelComponent},
  {path: 'et', component: EtComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTING);
