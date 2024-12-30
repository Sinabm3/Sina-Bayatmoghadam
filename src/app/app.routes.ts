import { Routes } from '@angular/router';
import { CompassGameComponent } from './components/compass-game/compass-game.component';
import { HomeComponent } from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {CompassGameAddComponent} from './components/compass-game-add/compass-game-add.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compass-game/add', component: CompassGameAddComponent},
  { path: 'compass-game/:id', component: CompassGameComponent },
  { path: 'compass-game', component: SearchComponent},
  { path: '**', redirectTo: ''}
];
