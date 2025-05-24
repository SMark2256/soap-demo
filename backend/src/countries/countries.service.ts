import { Injectable, Logger } from '@nestjs/common';
import * as soap from 'soap';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);
  private readonly soapUrl = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
  private soapClient: any;

  constructor() {
    this.initSoapClient();
  }

  private async initSoapClient() {
    try {
      this.soapClient = await soap.createClientAsync(this.soapUrl);
      this.logger.log('Countries SOAP client initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize Countries SOAP client: ${error.message}`);
      throw error;
    }
  }

  async getCountriesByName() {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log('Sending request to get list of countries by name');
      const result = await this.soapClient.ListOfCountryNamesByNameAsync({});
      this.logger.log(`Received ${result[0].ListOfCountryNamesByNameResult.tCountryCodeAndName.length} countries`);
      return result[0].ListOfCountryNamesByNameResult.tCountryCodeAndName;
    } catch (error) {
      this.logger.error(`Error getting countries by name: ${error.message}`);
      throw error;
    }
  }

  async getCapitalCity(countryISOCode: string) {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log(`Sending request to get capital city for country: ${countryISOCode}`);
      const result = await this.soapClient.CapitalCityAsync({ sCountryISOCode: countryISOCode });
      this.logger.log(`Capital city for ${countryISOCode}: ${result[0].CapitalCityResult}`);
      return result[0].CapitalCityResult;
    } catch (error) {
      this.logger.error(`Error getting capital city for ${countryISOCode}: ${error.message}`);
      throw error;
    }
  }

  async getCountryCurrency(countryISOCode: string) {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log(`Sending request to get currency for country: ${countryISOCode}`);
      const result = await this.soapClient.CountryCurrencyAsync({ sCountryISOCode: countryISOCode });
      this.logger.log(`Currency for ${countryISOCode}: ${JSON.stringify(result[0].CountryCurrencyResult)}`);
      return result[0].CountryCurrencyResult;
    } catch (error) {
      this.logger.error(`Error getting currency for ${countryISOCode}: ${error.message}`);
      throw error;
    }
  }

  async getCountryFlag(countryISOCode: string) {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log(`Sending request to get flag for country: ${countryISOCode}`);
      const result = await this.soapClient.CountryFlagAsync({ sCountryISOCode: countryISOCode });
      this.logger.log(`Flag URL for ${countryISOCode}: ${result[0].CountryFlagResult}`);
      return result[0].CountryFlagResult;
    } catch (error) {
      this.logger.error(`Error getting flag for ${countryISOCode}: ${error.message}`);
      throw error;
    }
  }

  async getCountryPhoneCode(countryISOCode: string) {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log(`Sending request to get phone code for country: ${countryISOCode}`);
      const result = await this.soapClient.CountryIntPhoneCodeAsync({ sCountryISOCode: countryISOCode });
      this.logger.log(`Phone code for ${countryISOCode}: ${result[0].CountryIntPhoneCodeResult}`);
      return result[0].CountryIntPhoneCodeResult;
    } catch (error) {
      this.logger.error(`Error getting phone code for ${countryISOCode}: ${error.message}`);
      throw error;
    }
  }
}
