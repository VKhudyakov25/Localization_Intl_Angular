import { Component } from '@angular/core';

import deMessages from 'devextreme/localization/messages/de.json';
import ruMessages from 'devextreme/localization/messages/ru.json';

import { AppService, Locale, Payment } from './app.service';
import { loadMessages, locale, formatMessage } from 'devextreme/localization';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  locale: string;

  locales: Locale[];

  payments: Payment[];

  formatMessage = formatMessage;
  constructor(private service: AppService) {
    this.locale = this.getLocale();
    this.payments = service.getPayments();
    this.locales = service.getLocales();
    this.initMessages();
    locale(this.locale);
  }

  initMessages() {
    loadMessages(deMessages);
    loadMessages(ruMessages);
    loadMessages(this.service.getDictionary());
  }
  changeLocale(data: any) {
    console.log('data :>> ', data);
    this.setLocale(data.value);
    parent.document.location.reload();
  }
  getLocale() {
    const storageLocale = sessionStorage.getItem('locale');
    return storageLocale != null ? storageLocale : 'en';
  }
  setLocale(savingLocale: any) {
    sessionStorage.setItem('locale', savingLocale);
  }
}
