import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent {
  
  validation = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(80),
  ]

  createArtistForm = new FormGroup({
    name: new FormControl('', this.validation),
    genre: new FormControl('', this.validation)
  })

  constructor(
    private artistService: ArtistService,
    private router: Router,
  ) { }

  create() {
    this.artistService.createArtist(this.createArtistForm).subscribe(res => { this.createArtistForm = res });
    this.router.navigate(['/artist']);
  }
  cancel() {
    this.router.navigate(['../']);
  }
}
