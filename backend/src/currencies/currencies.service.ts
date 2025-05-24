import { Injectable, Logger } from '@nestjs/common';
import * as soap from 'soap';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);
  private readonly soapUrl = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
  private soapClient: any;

  constructor() {
    this.initSoapClient();
  }

  private async initSoapClient() {
    try {
      this.soapClient = await soap.createClientAsync(this.soapUrl);
      this.logger.log('Currencies SOAP client initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize Currencies SOAP client: ${error.message}`);
      throw error;
    }
  }

  async getCurrenciesByName() {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log('Sending request to get list of currencies by name');
      const result = await this.soapClient.ListOfCurrenciesByNameAsync({});
      this.logger.log(`Received ${result[0].ListOfCurrenciesByNameResult.tCurrency.length} currencies`);
      return result[0].ListOfCurrenciesByNameResult.tCurrency;
    } catch (error) {
      this.logger.error(`Error getting currencies by name: ${error.message}`);
      throw error;
    }
  }
}
