import { Controller, Get, Query } from '@nestjs/common';
import { GreetService } from './greet.service';

@Controller('greet')
export class GreetController {
  constructor(private readonly greetService: GreetService) {}

  @Get()
  greet(@Query('name') name: string = 'World'): string {
    return this.greetService.greet(name);
  }
}
