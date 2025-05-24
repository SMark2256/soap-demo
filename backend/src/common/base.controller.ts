import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseController {
  protected handleError(error: any, defaultMessage: string, badRequestCondition?: string): never {
    throw new HttpException(
      error.message || defaultMessage,
      badRequestCondition && error.message === badRequestCondition
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
