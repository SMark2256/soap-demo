import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { BaseController } from '../common/base.controller';

@Controller('calculator')
export class CalculatorController extends BaseController {
  constructor(private readonly calculatorService: CalculatorService) {
    super();
  }

  private async performOperation(
    operation: 'add' | 'subtract' | 'multiply' | 'divide',
    intA: number,
    intB: number
  ) {
    try {
      if (operation === 'divide' && intB === 0) {
        this.handleError(0,'Division by zero is not allowed');
      }

      const result = await this.calculatorService[operation](Number(intA), Number(intB));
      return { result };
    } catch (error) {
      this.handleError(
        error,
        `Failed to perform ${operation}`,
        'Division by zero is not allowed'
      );
    }
  }

  @Post('add')
  async add(@Body() body: { intA: number; intB: number }) {
    return this.performOperation('add', body.intA, body.intB);
  }

  @Post('subtract')
  async subtract(@Body() body: { intA: number; intB: number }) {
    return this.performOperation('subtract', body.intA, body.intB);
  }

  @Post('multiply')
  async multiply(@Body() body: { intA: number; intB: number }) {
    return this.performOperation('multiply', body.intA, body.intB);
  }

  @Post('divide')
  async divide(@Body() body: { intA: number; intB: number }) {
    return this.performOperation('divide', body.intA, body.intB);
  }

  @Get('add')
  async addGet(@Query('intA') intA: number, @Query('intB') intB: number) {
    return this.performOperation('add', intA, intB);
  }

  @Get('subtract')
  async subtractGet(@Query('intA') intA: number, @Query('intB') intB: number) {
    return this.performOperation('subtract', intA, intB);
  }

  @Get('multiply')
  async multiplyGet(@Query('intA') intA: number, @Query('intB') intB: number) {
    return this.performOperation('multiply', intA, intB);
  }

  @Get('divide')
  async divideGet(@Query('intA') intA: number, @Query('intB') intB: number) {
    return this.performOperation('divide', intA, intB);
  }
}
