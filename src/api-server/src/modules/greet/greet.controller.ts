import { Controller, Get, Param } from '@nestjs/common';
import { GreetService } from './greet.service';

@Controller('greet')
export class GreetController {
  constructor(private readonly greetService: GreetService) {}

  @Get(':name')
  greet(@Param('name') name: string): string {
    return this.greetService.greet(name);
  }
}
