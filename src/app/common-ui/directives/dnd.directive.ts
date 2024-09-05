import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]',
  standalone: true
})
export class DndDirective {

  @Output() fileDroped = new EventEmitter<File>();

  @HostBinding('class.fileover')
  fileover = false

  @HostListener('dragover', ['$event'])

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = true
  }

  @HostListener('dragleave', ['$event'])

  onDragleave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false
  }

  @HostListener('drop', ['$event'])

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    this.fileover = false
    this.fileDroped.emit(event.dataTransfer?.files[0])
  }

}
