import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

// import { LinhadotempoComponent } from './linhadotempo/linhadotempo.component';
// import { PostinputComponent} from './postinput/postinput.component';

const APP_ROUTING: Routes = [
  {path: '', redirectTo:'inicio', pathMatch:"full"},
  {path : 'inicio', component: HomeComponent}
//   {path: 'postar', component: PostinputComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTING);
