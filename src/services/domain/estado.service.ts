import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { EstadoDTO } from "../../models/estado.dto";
import { CidadeDTO } from "../../models/cidade.dto";

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }

    buscarCidades(idEstado: string): Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${idEstado}/cidades`);
    }
}
