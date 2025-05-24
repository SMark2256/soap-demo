import { Injectable } from '@nestjs/common';
import { BaseSoapService } from '../common/base-soap.service';

@Injectable()
export class CalculatorService extends BaseSoapService {
  constructor() {
    super(CalculatorService.name, 'http://www.dneonline.com/calculator.asmx?wsdl');
  }

  async add(intA: number, intB: number): Promise<number> {
    const result = await this.callSoapMethod('Add', { intA, intB }, 'add');
    return result.AddResult;
  }

  async subtract(intA: number, intB: number): Promise<number> {
    const result = await this.callSoapMethod('Subtract', { intA, intB }, 'subtract');
    return result.SubtractResult;
  }

  async multiply(intA: number, intB: number): Promise<number> {
    const result = await this.callSoapMethod('Multiply', { intA, intB }, 'multiply');
    return result.MultiplyResult;
  }

  async divide(intA: number, intB: number): Promise<number> {
    if (intB === 0) {
      this.logger.warn('Division by zero attempt detected');
      throw new Error('Division by zero is not allowed');
    }

    const result = await this.callSoapMethod('Divide', { intA, intB }, 'divide');
    return result.DivideResult;
  }
}
