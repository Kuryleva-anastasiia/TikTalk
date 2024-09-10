import { Component, inject, Renderer2 } from '@angular/core';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { ProfileService } from '../../../data/services/profile.service';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostService } from '../../../data/services/post.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  profile = inject(ProfileService).me
  r2 = inject(Renderer2)
  postService = inject(PostService)

  postText = ''
  
  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return

    firstValueFrom(this.postService.createPost({
      title: 'Лучший пост!',
      content: this.postText,
      authorId: this.profile()!.id
    }))
  }
}
