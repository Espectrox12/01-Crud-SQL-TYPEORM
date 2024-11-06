import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[TypeOrmModule.forFeature([Role]),UsersModule],
  controllers: [RolesController],
  providers: [RolesService,UsersService],
})
export class RolesModule {}
