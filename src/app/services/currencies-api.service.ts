import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export interface Currency {
  sISOCode: string;
  sName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrenciesApiService {
  private apiUrl = 'http://localhost:3000/currencies';

  // Using signals for reactive state management
  currencies = signal<Currency[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  selectedCurrency = signal<Currency | null>(null);

  constructor(private http: HttpClient) { }

  // Load all currencies
  loadCurrencies(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<{ currencies: Currency[] }>(this.apiUrl)
      .pipe(
        tap(response => {
          this.currencies.set(response.currencies);
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set(error.message || 'Failed to load currencies');
          this.loading.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Select a currency
  selectCurrency(currency: Currency): void {
    this.selectedCurrency.set(currency);
  }
}
