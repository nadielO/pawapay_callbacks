import { IsEnum, IsNotEmpty, IsString, IsUUID, Length, Matches, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

enum CallbackStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

class FinancialAddress {
  @IsOptional()
  @IsString()
  address?: string;
}

class SuspiciousDepositTransactionReport {
  @IsOptional()
  @IsEnum(['AMOUNT_DISCREPANCY'])
  activityType?: string;

  @IsOptional()
  @IsString()
  comment?: string;
}

class DepositFailureReason {
  @IsOptional()
  @IsEnum(['OTHER_ERROR'])
  failureCode?: string;

  @IsOptional()
  @IsString()
  failureMessage?: string;
}

class TransactionMetadataResponse {
  @IsOptional()
  @IsString()
  orderId?: string;

  @IsOptional()
  @IsString()
  customerId?: string;
}

export class UpdateDepositDto {
  @IsOptional()
  @IsUUID(4)
  @Length(36, 36)
  depositId?: string;

  @IsOptional()
  @IsEnum(CallbackStatus)
  status?: CallbackStatus;

  @IsOptional()
  @Matches(/^([0]|([1-9][0-9]{0,17}))([.][0-9]{0,3}[1-9])?$/, {
    message: 'Invalid requestedAmount format',
  })
  @Length(1, 23)
  requestedAmount?: string;

  @IsOptional()
  @Matches(/^[A-Z]{3}$/, {
    message: 'Invalid currency format',
  })
  currency?: string;

  @IsOptional()
  @Matches(/^[A-Z]{3}$/, {
    message: 'Invalid country format',
  })
  country?: string;

  @IsOptional()
  @IsString()
  correspondent?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FinancialAddress)
  payer?: FinancialAddress;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/, {
    message: 'Invalid customerTimestamp format',
  })
  customerTimestamp?: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9 ]{4,22}$/, {
    message: 'Invalid statementDescription format',
  })
  statementDescription?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/, {
    message: 'Invalid created format',
  })
  created?: string;

  @IsOptional()
  @Matches(/^([0]|([1-9][0-9]{0,17}))([.][0-9]{0,3}[1-9])?$/, {
    message: 'Invalid depositedAmount format',
  })
  @Length(1, 23)
  depositedAmount?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/, {
    message: 'Invalid respondedByPayer format',
  })
  respondedByPayer?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SuspiciousDepositTransactionReport)
  suspiciousActivityReport?: SuspiciousDepositTransactionReport[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DepositFailureReason)
  failureReason?: DepositFailureReason;

  @IsOptional()
  @ValidateNested()
  @Type(() => TransactionMetadataResponse)
  metadata?: TransactionMetadataResponse;
}
