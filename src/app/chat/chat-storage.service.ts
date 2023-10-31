import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatStorageService {
  private storageKey = 'chatMessages';

  constructor() {}

  getMessages(): { message: string; type: string }[] {
    const messagesString = localStorage.getItem(this.storageKey);
    if (messagesString) {
      return JSON.parse(messagesString);
    }
    return [];
  }

  saveMessages(messages: { message: string; type: string }[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(messages));
  }
}
