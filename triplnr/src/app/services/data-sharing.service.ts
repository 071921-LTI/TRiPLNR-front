import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable()
export class DataSharingService {
  private data:User[] = [];

  setData(newData:User[]) {
      this.data = newData;
  }
  getData() {
      return this.data;
  }
}
