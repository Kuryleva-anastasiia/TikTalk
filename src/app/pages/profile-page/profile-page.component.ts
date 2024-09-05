import { Component, inject, WritableSignal } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SubscriberCardComponent } from "../../common-ui/sidebar/subscriber-card/subscriber-card.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";
import { AvatarUploadComponent } from "../settings-page/avatar-upload/avatar-upload.component";
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SubscriberCardComponent, ImgUrlPipe, PostFeedComponent, AvatarUploadComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if(id === 'me') return this.me$
        return this.profileService.getAccount(id)
    })
  )
}

