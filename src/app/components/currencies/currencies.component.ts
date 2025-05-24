import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrenciesApiService, Currency } from '../../services/currencies-api.service';
import { AppComponent } from '../../app.component';
import { effect } from '@angular/core';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit, OnDestroy {
  private dataLoaded = false;

  constructor(public currenciesService: CurrenciesApiService, private appComponent: AppComponent) {
    effect(() => {
      const currentTab = this.appComponent.activeTab();
      console.log('Currencies component detected tab change:', currentTab);

      if (currentTab === 'currencies' && !this.dataLoaded) {
        console.log('Loading currencies data...');
        this.currenciesService.loadCurrencies();
        this.dataLoaded = true;
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  onCurrencySelect(currency: Currency): void {
    this.currenciesService.selectCurrency(currency);
  }
}
