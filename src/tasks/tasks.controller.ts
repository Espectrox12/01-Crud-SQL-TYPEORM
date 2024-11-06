import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  
  @Post()
  @Roles("admin")
  @UseGuards(AuthGuard,RolesGuard)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @Roles("admin","user")
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(@Req() request: Request) {
    const userId = request.userId; // Aquí obtenemos el userId agregado por RolesGuard
    console.log(userId)
    if (userId) {
      // Si el usuario es un 'user', solo retornamos sus propias tareas
      return this.tasksService.findByUser(userId); 
    } else {
      // Si es 'admin', retornamos todas las tareas
      return this.tasksService.findAll(); 
    }
  }
  //@Get(':id')
  //findOne(@Param('id') id: number) {
    //return this.tasksService.findOne(id);
  //}

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Roles("admin")
  @UseGuards(AuthGuard,RolesGuard)
  remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
