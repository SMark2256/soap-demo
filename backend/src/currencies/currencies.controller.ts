import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { BaseController } from '../common/base.controller';

@Controller('currencies')
export class CurrenciesController extends BaseController{
  constructor(private readonly currenciesService: CurrenciesService) {
    super();
  }

  @Get()
  async getCurrenciesByName() {
    try {
      const currencies = await this.currenciesService.getCurrenciesByName();
      return { currencies };
    } catch (error) {
      this.handleError(
        error,
        'Failed to get currencies'
      );
    }
  }
}
