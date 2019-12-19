import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/field-message";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor( private storageService: StorageService, public alertCtrl: AlertController ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch(
            (error, caught) => {

                error = error.error || error;

                if (!error.status) {
                    error = JSON.parse(error);
                }

                console.log("Erro capturado pelo interceptor:", error);

                switch (error.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 422:
                        this.handle422(error);
                        break;
                    default:
                        this.handleErrorDefault(error);
                }

                return Observable.throw(error);
            }
        ) as any;
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro de Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }

    handleErrorDefault(error) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + error.status + ': ' + error.error,
            message: error.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }

    private listErrors(errors: FieldMessage[]): string {
        let s = '';
        for (var i = 0; i < errors.length; i++) {
            s = s + '<p><strong>' + errors[i].campo + '</strong>: ' + errors[i].mensagem + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
