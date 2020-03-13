import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../../service/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-delete-artist',
  templateUrl: './delete-artist.component.html',
  styleUrls: ['./delete-artist.component.css']
})
export class DeleteArtistComponent implements OnInit {
  id: string;
  artist: Artist;

  constructor(
    private artistSerice: ArtistService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.artistSerice.getArtist(this.id).subscribe(res => { this.artist = res });
  }

  delete() {
    if (confirm(`Are you sure to delete ${this.artist.name}?`)) {
      this.artistSerice.deleteArtist(this.id).subscribe();
      this.router.navigate(['/artist'])
    }
  }
  cancel() {
    this.location.back()
  }
}
