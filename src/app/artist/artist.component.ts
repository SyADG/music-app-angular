import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../service/artist.service';
import { Artist } from './artist.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(
    private artistService: ArtistService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get artists$() {
    return this.artistService.artists$;
  }

  ngOnInit() {
    this.artistService.getArtists();
  }

  songs() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    alert(id)
    this.router.navigate([`/${id}/songs`])
  }
}
