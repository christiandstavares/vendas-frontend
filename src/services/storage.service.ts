import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local-user";
import { STORAGE_KEYS } from "../config/storage-keys.config";

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let localUser = localStorage.getItem(STORAGE_KEYS.localUser);

        return localUser == null ? null : JSON.parse(localUser);
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}