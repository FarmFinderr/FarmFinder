import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal-add-post',
  standalone: true,
  imports: [],
  templateUrl: './modal-add-post.component.html',
  styleUrl: './modal-add-post.component.css'
})
export class ModalAddPostComponent {
  @Input() isModalOpen: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
    console.log("modal closed");
  }

}
