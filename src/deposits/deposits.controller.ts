import { Controller, Get, Post, Body, Patch, Param, Delete, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller({
  path: 'deposits',
  version: VERSION_NEUTRAL
})
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  @Version('1')
  @Post()
  create(@Body() createDepositDto: CreateDepositDto) {
    return this.depositsService.create(createDepositDto);
  }

  @Version('1')
  @Get()
  findAll() {
    return this.depositsService.findAll();
  }

  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositsService.findOne(id);
  }

  @Version('1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositDto: UpdateDepositDto) {
    return this.depositsService.update(id, updateDepositDto);
  }

  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositsService.remove(id);
  }
}
