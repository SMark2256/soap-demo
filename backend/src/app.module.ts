import { Module } from '@nestjs/common';
import { CalculatorModule } from './calculator/calculator.module';
import { CountriesModule } from './countries/countries.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [
    CalculatorModule,
    CountriesModule,
    CurrenciesModule,
    LanguagesModule,
  ],
})
export class AppModule {}
