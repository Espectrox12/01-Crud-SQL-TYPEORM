import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createTaskDto: CreateTaskDto) {
        const user = await this.userRepository.findOneBy({ id: createTaskDto.userId });
        
        if (!user) {
            throw new BadRequestException('Usuario no Existe');
        }

        const task = this.taskRepository.create({
            ...createTaskDto,
            user, // Aquí asignamos el usuario a la tarea
        });

        await this.taskRepository.save(task);
        return task;
    }

    async findByUser(userId: number): Promise<Task[]> {
      return this.taskRepository.find({
        where: { user: { id: userId } },
      });
    }


    async findAll() {
        return await this.taskRepository.find({
            relations: ['user'], // Esto carga también el usuario con la tarea
        });
    }

  async findOne(id: number) {
    return await this.taskRepository.findOneBy({id});//`This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id,updateTaskDto);//`This action updates a #${id} task`;
    return;
  }

  async remove(id: number) {
    return await this.taskRepository.softDelete({id});//`This action removes a #${id} task`;
  }
}
