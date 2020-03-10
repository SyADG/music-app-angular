import { Component, OnInit } from '@angular/core';
import { RequestSong } from './songs.model';
import { SongService } from './song.service';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  id: string;
  song: RequestSong;
  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  get songs$() {
    return this.songService.songs$;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.songService.getSongs(this.id);
  }
  back() {
    this._location.back()
  }
}
