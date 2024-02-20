import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNzIcons } from './icons-provider';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { environment } from '../environments/environment';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNzIcons(),
    provideNzI18n(es_ES),
    importProvidersFrom([
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ]),
    provideAnimations(),
  ],
};
