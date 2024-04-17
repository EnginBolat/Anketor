import { MMKV } from 'react-native-mmkv';

interface ILocalStorage {
  save(key: string, data: any): void;
  saveModel(key: string, data: any): void;
  get(key: string): any;
  getBoolean(key: string): boolean;
  clearItem(key: string): void;
}

class LocalStorage implements ILocalStorage {
  private storage: MMKV;
  constructor() {
    this.storage = new MMKV();
  }
  //  Delete

  clearItem(key: string) {
    this.storage.delete(key);
    console.log('Deleted')
  }

  //   Save
  save(key: string, data: any): void {
    this.storage.set(key, JSON.stringify(data));
    console.log('Saved');
  }

  saveModel(key: string, data: any): void {
    this.storage.set(key, JSON.stringify(data));
    console.log(`Saved: ${JSON.stringify(data)}`);
  }

  //   Get

  get(key: string): any {
    const jsonData = this.storage.getString(key);
    if (jsonData) {
      const jsonObject = JSON.parse(jsonData);
      console.log(`Readed Data: ${jsonData}`);
      return jsonObject;
    }
  }

  getBoolean(key: string): any {
    const data = this.storage.getBoolean(key);
    if (data) {
      return data;
    }
    return false;
  }
}

export default LocalStorage;