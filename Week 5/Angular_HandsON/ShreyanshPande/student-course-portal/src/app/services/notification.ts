import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications: string[] = [];

  add(message: string) {
    this.notifications.push(message);
  }
}
