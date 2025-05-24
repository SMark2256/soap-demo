import { Logger } from '@nestjs/common';
import * as soap from 'soap';

export abstract class BaseSoapService {
  protected readonly logger: Logger;
  protected readonly soapUrl: string;
  protected soapClient: any;

  constructor(serviceName: string, soapUrl: string) {
    this.logger = new Logger(serviceName);
    this.soapUrl = soapUrl;
    this.initSoapClient();
  }

  protected async initSoapClient() {
    try {
      this.soapClient = await soap.createClientAsync(this.soapUrl);
      this.logger.log('SOAP client initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize SOAP client: ${error.message}`);
      throw error;
    }
  }

  protected async callSoapMethod(methodName: string, params: any, logMessage: string) {
    try {
      if (!this.soapClient) {
        await this.initSoapClient();
      }

      this.logger.log(`Sending ${methodName} request with parameters: ${JSON.stringify(params)}`);
      const result = await this.soapClient[`${methodName}Async`](params);
      this.logger.log(`${methodName} operation result: ${JSON.stringify(result[0])}`);
      return result[0];
    } catch (error) {
      this.logger.error(`Error in ${methodName} operation: ${error.message}`);
      throw error;
    }
  }
}
