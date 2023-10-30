import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {
  //el qr tiene que generar una nueva instancia de la clase con timestamp
  clases = [];
  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.dataService.getClases().subscribe((res) => {
      console.log(res);
      this.clases = res;
    });
  }

  async addClase() {
    const alert = await this.alertController.create({
      header: 'Agregar Asignatura',
      inputs: [
        {
          name: 'nombreClase',
          placeholder: 'Nombre Asignatura',
          type: 'textarea',
        },
        {
          name: 'profesor',
          placeholder: 'Nombre Profesor',
          type: 'text',
        },
        {
          name: 'horario',
          placeholder: 'horarios asignatura',
          type: 'textarea',
        },
        { name: 'sigla', placeholder: 'Sigla Asignatura', type: 'text' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Añadir',
          handler: (res) => {
            this.dataService.addClase({
              nombreClase: res.nombreClase,
              profesor: res.profesor,
              horario: res.horario,
              sigla: res.sigla,
              estudiantes: [],
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async openClase(clase) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { id: clase.id },
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
    });
    modal.present();
  }

  ngOnInit() {}
}
