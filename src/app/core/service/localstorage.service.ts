import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private storage = localStorage

constructor() { }



getLocalItem(key: string) {
  return JSON.parse(JSON.stringify(this.storage.getItem(key))) || undefined
}
setItem(key: string, value: number|string|Object) {
  const setValue = JSON.stringify(value)
  this.storage.setItem(key, setValue)
}

removeItem(key:string) {
  this.storage.removeItem(key)
}

itemExist(key: string): boolean {
  return !!this.getLocalItem(key)
}

clearAll() {
  this.storage.clear()
}

}
