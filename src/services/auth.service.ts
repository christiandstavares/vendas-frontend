import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local-user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storageService: StorageService) {}

    authenticate(credenciais: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(auth: string) {
        let token = auth.substring(7);
        let user: LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        }
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}