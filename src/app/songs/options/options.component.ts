import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../service/song.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  id: string;
  musicId: string;

  validation = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(80),
  ]
  updateSongForm = new FormGroup({
    name: new FormControl('', this.validation),
    date: new FormControl('', this.validation)
  })

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id1');
    this.musicId = this.activatedRoute.snapshot.paramMap.get('id2');
    this.songService.getSong(this.id, this.musicId).subscribe(
      res =>
        this.updateSongForm.patchValue({ name: res.name, date: res.date })
    )
  }
  update() {
    this.songService.updateSong(this.id, this.musicId, this.updateSongForm).subscribe();
    this.router.navigate([`artist/${this.id}/songs`]);
  }
  cancel() {
    this.router.navigate([`artist`]);
  }
  delete() {
    if (confirm(`Are you sure to delete ${this.updateSongForm.value.name}?`)) {
      this.songService.deleteSong(this.id, this.musicId).subscribe();
      this.router.navigate([`artist/${this.id}/songs`]);
    }
  }
}
