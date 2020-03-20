import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistComponent } from './artist/artist.component';
import { CreateArtistComponent } from './artist/create-artist/create-artist.component';
import { UpdateArtistComponent } from "./artist/update-artist/update-artist.component";
import { DeleteArtistComponent } from "./artist/delete-artist/delete-artist.component";
import { SongsComponent } from './songs/songs.component';
import { CreateSongComponent } from "./songs/create-song/create-song.component";

import { OptionsComponent } from "./songs/options/options.component";
import { LoginComponent } from './session/login/login.component';
import { LogoutComponent } from './session/logout/logout.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ArtistComponent, canActivate: [AuthGuardService]  },
  { path: 'artist', component: ArtistComponent, canActivate: [AuthGuardService]  },
  { path: 'artist/create', component: CreateArtistComponent, canActivate: [AuthGuardService] },
  { path: 'artist/update/:id', component: UpdateArtistComponent, canActivate: [AuthGuardService] },
  { path: 'artist/delete/:id', component: DeleteArtistComponent, canActivate: [AuthGuardService] },
  { path: 'artist/:id/songs', component: SongsComponent, canActivate: [AuthGuardService] },
  { path: 'artist/:id/songs/add', component: CreateSongComponent, canActivate: [AuthGuardService] },
  { path: 'artist/:id1/songs/:id2', component: OptionsComponent, canActivate: [AuthGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
