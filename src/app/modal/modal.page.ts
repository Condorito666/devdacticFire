import { Component, Input, OnInit } from '@angular/core';
import { DataService, Note } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';
//para mostrar una vez escaneado el qr desplegar el modal
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  note: Note = null;
  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe((res) => (this.note = res));
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.note);
    this.modalController.dismiss();
  }

  async updateNote() {
    this.dataService.updateNote(this.note);
    const toast = await this.toastController.create({
      message: 'Nota Actualizada!.',
      duration: 1000,
    });
    toast.present();
  }
}
