import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor() { }

  saveDataToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  getDataFromLocalStorage(key: string) {
    localStorage.getItem(key)
  }

  removeDataFromLocalStorage(key: any) {
    localStorage.removeItem(key)
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  clearLocalStorageOnTimeout(timeoutDuration: number) {
    setTimeout(()=> {
      this.clearLocalStorage();
    }, timeoutDuration)
  }


  saveDataToSessionStorage(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  getDataFromSessionStorage(key: string) {
    sessionStorage.getItem(key)
  }

  removeDataFromSessionStorage(key: any) {
    sessionStorage.removeItem(key)
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  clearSessionStorageOnTimeout(timeoutDuration: number) {
    setTimeout(()=> {
      this.clearSessionStorage();
    }, timeoutDuration)
  }


  
}
