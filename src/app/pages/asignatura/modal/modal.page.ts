import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Clases, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  clase: Clases = null;
  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.dataService
      .getClasebyId(this.id)
      .subscribe((res) => (this.clase = res));
  }

  async deleteClase() {
    await this.dataService.deleteClase(this.clase);
    this.modalController.dismiss();
  }

  async updateClase() {
    this.dataService.updateClase(this.clase);
    const toast = await this.toastController.create({
      message: 'Asignatura Actualizada!.',
      duration: 2000,
    });
    toast.present();
  }
}
