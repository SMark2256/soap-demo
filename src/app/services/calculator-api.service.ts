import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

export interface CalculationResult {
  result: number;
}

export interface CalculationRequest {
  firstNumber: number;
  secondNumber: number;
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  private apiUrl = 'http://localhost:3000/calculator';

  result = signal<number | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  lastCalculation = signal<CalculationRequest | null>(null);

  constructor(private http: HttpClient) { }

  calculate(firstNumber: number, secondNumber: number, operation: 'add' | 'subtract' | 'multiply' | 'divide'): Observable<CalculationResult> {
    this.loading.set(true);
    this.error.set(null);

    const calculationRequest: CalculationRequest = {
      firstNumber,
      secondNumber,
      operation
    };

    this.lastCalculation.set(calculationRequest);

    let serviceCall: Observable<CalculationResult>;

    switch (operation) {
      case 'add':
        serviceCall = this.addRequest(firstNumber, secondNumber);
        break;
      case 'subtract':
        serviceCall = this.subtractRequest(firstNumber, secondNumber);
        break;
      case 'multiply':
        serviceCall = this.multiplyRequest(firstNumber, secondNumber);
        break;
      case 'divide':
        serviceCall = this.divideRequest(firstNumber, secondNumber);
        break;
      default:
        this.error.set('Invalid operation');
        this.loading.set(false);
        return throwError(() => new Error('Invalid operation'));
    }

    return serviceCall.pipe(
      tap(response => {
        this.result.set(response.result);
        this.loading.set(false);
      }),
      catchError(error => {
        this.error.set(error.message || 'An error occurred during calculation');
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }


  add(intA: number, intB: number): Observable<CalculationResult> {
    return this.addRequest(intA, intB);
  }

  subtract(intA: number, intB: number): Observable<CalculationResult> {
    return this.subtractRequest(intA, intB);
  }

  multiply(intA: number, intB: number): Observable<CalculationResult> {
    return this.multiplyRequest(intA, intB);
  }

  divide(intA: number, intB: number): Observable<CalculationResult> {
    return this.divideRequest(intA, intB);
  }

  private addRequest(intA: number, intB: number): Observable<CalculationResult> {
    return this.http.post<CalculationResult>(`${this.apiUrl}/add`, { intA, intB });
  }

  private subtractRequest(intA: number, intB: number): Observable<CalculationResult> {
    return this.http.post<CalculationResult>(`${this.apiUrl}/subtract`, { intA, intB });
  }

  private multiplyRequest(intA: number, intB: number): Observable<CalculationResult> {
    return this.http.post<CalculationResult>(`${this.apiUrl}/multiply`, { intA, intB });
  }

  private divideRequest(intA: number, intB: number): Observable<CalculationResult> {
    return this.http.post<CalculationResult>(`${this.apiUrl}/divide`, { intA, intB });
  }
}
