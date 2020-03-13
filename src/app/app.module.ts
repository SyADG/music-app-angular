import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateArtistComponent } from './artist/create-artist/create-artist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateArtistComponent } from './artist/update-artist/update-artist.component';
import { DeleteArtistComponent } from './artist/delete-artist/delete-artist.component';
import { SongsComponent } from './songs/songs.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OptionsComponent } from './songs/options/options.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './session/login/login.component';
import { LogoutComponent } from './session/logout/logout.component';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';
export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    CreateArtistComponent,
    UpdateArtistComponent,
    DeleteArtistComponent,
    SongsComponent,
    CreateSongComponent,
    OptionsComponent,
    TopBarComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(options),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
