import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export interface Language {
  sISOCode: string;
  sName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguagesApiService {
  private apiUrl = 'http://localhost:3000/languages';

  // Using signals for reactive state management
  languages = signal<Language[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  selectedLanguage = signal<Language | null>(null);

  constructor(private http: HttpClient) { }

  // Load all languages
  loadLanguages() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<{ languages: Language[] }>(this.apiUrl)
      .pipe(
        tap(response => {
          this.languages.set(response.languages);
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set(error.message || 'Failed to load languages');
          this.loading.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Select a language
  selectLanguage(language: Language) {
    this.selectedLanguage.set(language);
  }
}
