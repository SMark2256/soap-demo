import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

export interface Country {
  sISOCode: string;
  sName: string;
}

export interface CountryCapital {
  capital: string;
}

export interface CountryCurrency {
  currency: {
    sISOCode: string;
    sName: string;
  };
}

export interface CountryFlag {
  flagUrl: string;
}

export interface CountryPhoneCode {
  phoneCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {
  private apiUrl = 'http://localhost:3000/countries';

  // Using signals for reactive state management
  countries = signal<Country[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  selectedCountry = signal<string | null>(null);
  capitalCity = signal<string | null>(null);
  currency = signal<{ code: string, name: string } | null>(null);
  flagUrl = signal<string | null>(null);
  phoneCode = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  // Load all countries
  loadCountries(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<{ countries: Country[] }>(this.apiUrl)
      .pipe(
        tap(response => {
          this.countries.set(response.countries);
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set(error.message || 'Failed to load countries');
          this.loading.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Select a country and load its details
  selectCountry(countryCode: string): void {
    this.selectedCountry.set(countryCode);
    this.loadCapitalCity(countryCode);
    this.loadCurrency(countryCode);
    this.loadFlag(countryCode);
    this.loadPhoneCode(countryCode);
  }

  // Load capital city for a country
  loadCapitalCity(countryCode: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<CountryCapital>(`${this.apiUrl}/capital/${countryCode}`)
      .pipe(
        tap(response => {
          this.capitalCity.set(response.capital);
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set(error.message || 'Failed to load capital city');
          this.loading.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Load currency for a country
  loadCurrency(countryCode: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<CountryCurrency>(`${this.apiUrl}/currency/${countryCode}`)
      .pipe(
        tap(response => {
          if (response.currency) {
            this.currency.set({
              code: response.currency.sISOCode,
              name: response.currency.sName
            });
          } else {
            this.currency.set(null);
          }
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set(error.message || 'Failed to load currency');
          this.loading.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Load flag URL for a country
  loadFlag(countryCode: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<CountryFlag>(`${this.apiUrl}/flag/${countryCode}`)
      .pipe(
        tap(response => {
          this.flagUrl.set(response.flagUrl);
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set(error.message || 'Failed to load flag');
          this.loading.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Load phone code for a country
  loadPhoneCode(countryCode: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<CountryPhoneCode>(`${this.apiUrl}/phone/${countryCode}`)
      .pipe(
        tap(response => {
          this.phoneCode.set(response.phoneCode);
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set(error.message || 'Failed to load phone code');
          this.loading.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
