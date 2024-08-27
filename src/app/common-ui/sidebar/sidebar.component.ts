import {Component, inject, OnInit} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom, Observable} from "rxjs";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {Profile} from "../../data/interface/profile.interface";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService  = inject(ProfileService);
  showIndicator = false;
  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe())
  }
}

