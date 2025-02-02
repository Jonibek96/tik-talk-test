import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    ReactiveFormsModule,
    AvatarUploadComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUpload!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disables: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.margeStack(this.profileService.me()?.stack)
      });
    })
  }

  onSave() {
    this.form.markAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) {
      return
    }

    if (this.avatarUpload.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUpload.avatar));
    }

    //@ts-ignore
    firstValueFrom(this.profileService.pathProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack),
    }))
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack

    return stack.split(',')
  }

  margeStack(stack: string | null | string[] | undefined) {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
