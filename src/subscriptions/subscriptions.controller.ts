import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubscriptionsService } from './subscriptions.service';

class CreateSubscriptionDto {
  userId: number;
  scpiUnitId: number;
  desiredUnits: number;
}

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Res() res: Response,
  ) {
    try {
      const subscription = await this.subscriptionsService.subscribeToScpi(
        createSubscriptionDto.userId,
        createSubscriptionDto.scpiUnitId,
        createSubscriptionDto.desiredUnits,
      );
      return res.status(HttpStatus.CREATED).json({
        message: 'Subscription successful!',
        subscription: subscription,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Subscription failed.',
        error: error.message,
      });
    }
  }
}
