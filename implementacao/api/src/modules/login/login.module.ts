import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PrismaService } from 'prisma/prisma.service';
import { LoginRepository } from './login.repository';


@Module({
  controllers: [LoginController],
  providers: [LoginService, PrismaService, LoginRepository],
  exports: [LoginService, PrismaService, LoginRepository],
})
export class LoginModule {}
