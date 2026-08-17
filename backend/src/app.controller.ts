import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Req() req: any) {
    return { message: 'Accès autorisé', user: req.user };
  }
}
