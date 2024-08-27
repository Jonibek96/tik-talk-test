import {Component, signal} from '@angular/core';
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {DragAndDropDirective} from "../../../common-ui/directives/drag-and-drop.directive";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    SvgIconComponent,
    DragAndDropDirective,
    FormsModule
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('assets/imgs/avatar-placeholder.jpg');
  avatar: File | null = null


  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file) return

    if (!file.type || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '');
    }

    reader.readAsDataURL(file)
    this.avatar = file;
  }
}
