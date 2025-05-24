import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountriesApiService } from '../../services/countries-api.service';
import { AppComponent } from '../../app.component';
import { effect } from '@angular/core';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {
  private dataLoaded = false;

  constructor(public countriesService: CountriesApiService, private appComponent: AppComponent) {
    effect(() => {
      const currentTab = this.appComponent.activeTab();
      console.log('Countries component detected tab change:', currentTab);

      if (currentTab === 'countries' && !this.dataLoaded) {
        console.log('Loading countries data...');
        this.countriesService.loadCountries();
        this.dataLoaded = true;
      }
    });
  }

  onCountrySelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const countryCode = selectElement.value;

    if (countryCode) {
      this.countriesService.selectCountry(countryCode);
    }
  }
}
