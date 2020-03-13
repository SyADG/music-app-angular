import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../service/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestArtist } from '../artist.model';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html',
  styleUrls: ['./update-artist.component.css']
})
export class UpdateArtistComponent implements OnInit {

  id: string;

  validation = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(80),
  ]

  updateArtistForm = new FormGroup({
    name: new FormControl('', this.validation),
    genre: new FormControl('', this.validation)
  });

  constructor(
    private artistService: ArtistService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router) { }


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.artistService.getArtist(this.id).subscribe(res => {
      this.updateArtistForm.patchValue({ name: res.name, genre: res.genre })
    });
  }

  update() {
    this.artistService.updateArtist(this.id, this.updateArtistForm).subscribe();
    this.router.navigate(['/artist'])
  }
  cancel() {
    this.location.back()
  }
}