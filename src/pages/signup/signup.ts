import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EstadoService } from "../../services/domain/estado.service";
import { EstadoDTO } from "../../models/estado.dto";
import { CidadeDTO } from "../../models/cidade.dto";
import { ClienteService } from "../../services/domain/cliente.service";

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    formGroup: FormGroup;
    estados: EstadoDTO[];
    cidades: CidadeDTO[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public estadoService: EstadoService,
        public clienteService: ClienteService,
        public alertController: AlertController
    ) {
        this.formGroup = formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
            email: ['', [Validators.required, Validators.email]],
            tipo: [1, [Validators.required]],
            cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
            senha: ['', [Validators.required]],
            logradouro: ['', [Validators.required]],
            numero: ['', [Validators.required]],
            complemento: ['', []],
            bairro: ['', [Validators.required]],
            cep: ['', [Validators.required]],
            telefone1: ['', [Validators.required]],
            telefone2: [null, []],
            telefone3: [null, []],
            idEstado: ['', [Validators.required]],
            idCidade: ['', [Validators.required]]
        });
    }

    ionViewDidLoad() {
        this.estadoService.findAll().subscribe(
            response => {
                this.estados = response;
            }
        );
    }

    updateCidades() {
        let idEstado = this.formGroup.value.idEstado;

        if (idEstado) {
            this.estadoService.buscarCidades(idEstado).subscribe(
                response => {
                    this.cidades = response;
                }
            );
        } else {
            this.cidades = [];
        }

        this.formGroup.controls.idCidade.setValue('');
    }

    signupUser() {
        this.clienteService.insert(this.formGroup.value).subscribe(
            () => {
                let alert = this.alertController.create({
                    title: 'Sucesso!',
                    message: 'Cadastro efetuado com sucesso',
                    enableBackdropDismiss: false,
                    buttons: [
                        {
                            text: 'OK',
                            handler: () => {
                                this.navCtrl.pop();
                            }
                        }
                    ]
                });
                alert.present();
            }
        );
    }
}
