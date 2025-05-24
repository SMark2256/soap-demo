import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguagesApiService, Language } from '../../services/languages-api.service';
import { AppComponent } from '../../app.component';
import { effect } from '@angular/core';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {
  private dataLoaded = false;

  searchTerm = signal<string>('');

  filteredLanguages = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.languagesService.languages();
    }

    return this.languagesService.languages().filter(language =>
      language.sName.toLowerCase().includes(term) ||
      language.sISOCode.toLowerCase().includes(term)
    );
  });

  constructor(public languagesService: LanguagesApiService, private appComponent: AppComponent) {
    effect(() => {
      const currentTab = this.appComponent.activeTab();
      console.log('Languages component detected tab change:', currentTab);

      if (currentTab === 'languages' && !this.dataLoaded) {
        console.log('Loading languages data...');
        this.languagesService.loadLanguages();
        this.dataLoaded = true;
      }
    });
  }

  updateSearchTerm(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onLanguageSelect(language: Language) {
    this.languagesService.selectLanguage(language);
  }
}
