import { IsEnum, IsNotEmpty, IsString, IsUUID, Length, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

enum CallbackStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

class FinancialAddress {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

class SuspiciousDepositTransactionReport {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['AMOUNT_DISCREPANCY'])
  activityType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;
}

class DepositFailureReason {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['OTHER_ERROR'])
  failureCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  failureMessage: string;
}

class TransactionMetadataResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerId: string;
}

export class CreateDepositDto {
  @ApiProperty()
  @IsUUID(4)
  @Length(36, 36)
  depositId: string;

  @ApiProperty({ enum: CallbackStatus })
  @IsEnum(CallbackStatus)
  status: CallbackStatus;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^([0]|([1-9][0-9]{0,17}))([.][0-9]{0,3}[1-9])?$/, {
    message: 'Invalid requestedAmount format',
  })
  @Length(1, 23)
  requestedAmount: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}$/, {
    message: 'Invalid currency format',
  })
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}$/, {
    message: 'Invalid country format',
  })
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  correspondent: string;

  @ApiProperty({ type: () => FinancialAddress })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FinancialAddress)
  payer: FinancialAddress;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/, {
    message: 'Invalid customerTimestamp format',
  })
  customerTimestamp: string;

  @ApiProperty({ required: false })
  @Matches(/^[a-zA-Z0-9 ]{4,22}$/, {
    message: 'Invalid statementDescription format',
  })
  statementDescription?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/, {
    message: 'Invalid created format',
  })
  created: string;

  @ApiProperty({ required: false })
  @Matches(/^([0]|([1-9][0-9]{0,17}))([.][0-9]{0,3}[1-9])?$/, {
    message: 'Invalid depositedAmount format',
  })
  @Length(1, 23)
  depositedAmount?: string;

  @ApiProperty({ required: false })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/, {
    message: 'Invalid respondedByPayer format',
  })
  respondedByPayer?: string;

  @ApiProperty({ type: () => [SuspiciousDepositTransactionReport], required: false })
  @ValidateNested()
  @Type(() => SuspiciousDepositTransactionReport)
  suspiciousActivityReport?: SuspiciousDepositTransactionReport[];

  @ApiProperty({ type: () => DepositFailureReason, required: false })
  @ValidateNested()
  @Type(() => DepositFailureReason)
  failureReason?: DepositFailureReason;

  @ApiProperty({ type: () => TransactionMetadataResponse, required: false })
  @ValidateNested()
  @Type(() => TransactionMetadataResponse)
  metadata?: TransactionMetadataResponse;
}
