import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {
  estudiantes = [];

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.dataService.getEstudiantes().subscribe((res) => {
      console.log(res);

      this.estudiantes = res;
    });
  }

  openEstudiante(estudiante) {}

  addEstudiante() {}

  ngOnInit() {}
}
