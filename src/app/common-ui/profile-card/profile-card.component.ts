import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../../data/interface/profile.interface";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() profile!: Profile;

  constructor() { }

  ngOnInit(): void {
  }

}
