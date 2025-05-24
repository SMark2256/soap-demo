import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { LanguagesComponent } from './components/languages/languages.component';

export type TabType = 'calculator' | 'countries' | 'currencies' | 'languages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CalculatorComponent,
    CountriesComponent,
    CurrenciesComponent,
    LanguagesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SOAP API Demo';
  activeTab = signal<TabType>('calculator');

  constructor() {}

  setActiveTab(tabId: TabType): void {
    this.activeTab.set(tabId);
    console.log(`Tab changed to: ${tabId}`);
  }
}
