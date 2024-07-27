import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PayoutsModule } from './payouts/payouts.module';
import { DepositsModule } from './deposits/deposits.module';
import { RefundsModule } from './refunds/refunds.module';


@Module({
  imports: [PayoutsModule, DepositsModule, RefundsModule, ConfigModule.forRoot({ cache: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
