import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from './interface/user-info';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  constructor(private persistenceService: PersistenceService) { }
  initialUserValue: UserInfo = this.persistenceService.get('userInfo', StorageType.SESSION);
  userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(this.initialUserValue);

   getData(): UserInfo {
    return this.userInfo.getValue();
  }

   setData(value: UserInfo) {
    this.userInfo.next(value);
  }

}
