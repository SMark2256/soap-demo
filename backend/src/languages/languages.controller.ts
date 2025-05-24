import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import {BaseController} from '../common/base.controller';

@Controller('languages')
export class LanguagesController extends BaseController {
  constructor(private readonly languagesService: LanguagesService) {
    super();
  }

  @Get()
  async getLanguagesByName() {
    try {
      const languages = await this.languagesService.getLanguagesByName();
      return { languages };
    } catch (error) {
      this.handleError(error, 'Failed to get languages');
    }
  }
}
