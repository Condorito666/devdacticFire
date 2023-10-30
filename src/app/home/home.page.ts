import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes = [];
  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.dataService.getNotes().subscribe((res) => {
      console.log(res);
      this.notes = res;
    });
  }

  async openNote(note) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8,
    });
    modal.present();
  }

  async addNote() {
    const alert = await this.alertController.create({
      header: 'Add Note',
      inputs: [
        { name: 'title', placeholder: 'My Cool Note', type: 'text' },
        {
          name: 'text',
          placeholder: 'learn Ionic',
          type: 'textarea',
        },
      ],
      buttons: [
        {
          text: 'cancel ',
          role: 'cancel',
        },
        {
          text: 'add',
          handler: (res) => {
            this.dataService.addNote({ title: res.title, text: res.text });
          },
        },
      ],
    });
    await alert.present();
  }
}
