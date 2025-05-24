import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { BaseController } from '../common/base.controller';

@Controller('countries')
export class CountriesController extends BaseController {
  constructor(private readonly countriesService: CountriesService) {
    super();
  }

  @Get()
  async getCountriesByName() {
    try {
      const countries = await this.countriesService.getCountriesByName();
      return { countries };
    } catch (error) {
      this.handleError(error, 'Failed to get countries');
    }
  }

  @Get('capital/:code')
  async getCapitalCity(@Param('code') countryCode: string) {
    try {
      if (!countryCode) {
        this.handleError(0,'Country code is required');
      }

      const capital = await this.countriesService.getCapitalCity(countryCode);
      return { capital };
    } catch (error) {
      this.handleError(error, 'Failed to get capital city');
    }
  }

  @Get('currency/:code')
  async getCountryCurrency(@Param('code') countryCode: string) {
    try {
      if (!countryCode) {
        this.handleError(0,'Country code is required');
      }

      const currency = await this.countriesService.getCountryCurrency(countryCode);
      return { currency };
    } catch (error) {
      this.handleError(error, 'Failed to get country currency')
    }
  }

  @Get('flag/:code')
  async getCountryFlag(@Param('code') countryCode: string) {
    try {
      if (!countryCode) {
        this.handleError(0,'Country code is required');
      }

      const flagUrl = await this.countriesService.getCountryFlag(countryCode);
      return { flagUrl };
    } catch (error) {
      this.handleError(error, 'Country flag is required');
    }
  }

  @Get('phone/:code')
  async getCountryPhoneCode(@Param('code') countryCode: string) {
    try {
      if (!countryCode) {
        this.handleError(0,'Country code is required');
      }

      const phoneCode = await this.countriesService.getCountryPhoneCode(countryCode);
      return { phoneCode };
    } catch (error) {
      this.handleError(error, 'Failed to get country phone code');
    }
  }
}
