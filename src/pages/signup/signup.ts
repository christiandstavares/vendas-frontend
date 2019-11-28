import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EstadoService } from "../../services/domain/estado.service";
import { EstadoDTO } from "../../models/estado.dto";
import { CidadeDTO } from "../../models/cidade.dto";

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
        public estadoService: EstadoService
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
            bairro: ['', []],
            cep: ['', [Validators.required]],
            telefone1: ['', [Validators.required]],
            telefone2: ['', []],
            telefone3: ['', []],
            estadoId: ['', [Validators.required]],
            cidadeId: ['', [Validators.required]]
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
        let idEstado = this.formGroup.value.estadoId;

        if (idEstado) {
            this.estadoService.buscarCidades(idEstado).subscribe(
                response => {
                    this.cidades = response;
                }
            );
        } else {
            this.cidades = [];
        }

        this.formGroup.controls.cidadeId.setValue('');
    }

    signupUser() {
        console.log("é nois");
    }
}
