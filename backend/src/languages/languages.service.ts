import { Injectable, Logger } from '@nestjs/common';
import * as soap from 'soap';

@Injectable()
export class LanguagesService {
  private readonly logger = new Logger(LanguagesService.name);
  private readonly soapUrl = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
  private soapClient: any;

  constructor() {}

  private async initSoapClient() {
    try {
      this.soapClient = await soap.createClientAsync(this.soapUrl);
      this.logger.log('Languages SOAP client initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize Languages SOAP client: ${error.message}`);
      throw error;
    }
  }

  async getLanguagesByName() {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log('Sending request to get list of languages by name');
      const result = await this.soapClient.ListOfLanguagesByNameAsync({});
      this.logger.log(`Received ${result[0].ListOfLanguagesByNameResult.tLanguage.length} languages`);
      return result[0].ListOfLanguagesByNameResult.tLanguage;
    } catch (error) {
      this.logger.error(`Error getting languages by name: ${error.message}`);
      throw error;
    }
  }
}
