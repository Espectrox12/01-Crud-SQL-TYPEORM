import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role) // Inyecta también el repositorio de Role si lo necesitas
    private readonly roleRepository: Repository<Role>
) {}

async create(createUserDto: CreateUserDto) {
  const role = await this.roleRepository.findOneBy({ rol: createUserDto.rol });  // Asegúrate de que rol sea el nombre o el id

  if (!role) {
      throw new BadRequestException('Rol no encontrado');
  }

  // Aquí guardas el usuario con el rol
  const user = this.userRepository.create({
      ...createUserDto,
      role: role,  // Asignamos el rol encontrado
  });

  return await this.userRepository.save(user);
}

async findOneByEmail(email: string) {
  return this.userRepository.findOneBy({email});//return `This action returns all users`;
}

async findAll() {
  return await this.userRepository.find();//return `This action returns all users`;
}

async findOne(id: number) {
  return `This action returns a #${id} user`;
}

async update(id: number, updateUserDto: UpdateUserDto) {
  return //await this.userRepository.update(id,updateUserDto);`This action updates a #${id} user`;
}

async remove(id: number) {
  return await this.userRepository.softDelete(id); `This action removes a #${id} user`;
}

}
