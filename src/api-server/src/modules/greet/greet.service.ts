import { Injectable } from '@nestjs/common';

@Injectable()
export class GreetService {
  greet(name: string): string {
    return `Hello ${name}!`;
  }
}
