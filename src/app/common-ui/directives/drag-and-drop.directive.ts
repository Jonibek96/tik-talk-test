import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DragAndDropDirective {
  @HostBinding('class.fileover') fileOver = false;
  @Output() fillDropped = new EventEmitter<File>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;

    this.fillDropped.emit(event.dataTransfer?.files[0]);
  }

}
