import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RelationQueryBuilder } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}


  canActivate(
    context: ExecutionContext,
  ): boolean {

    const role = this.reflector.getAllAndOverride('roles',[
      context.getHandler(),
      context.getClass()
    ])

    if(!role){
      return true;
    }

    const { user} = context.switchToHttp().getRequest();
    console.log(user.role.rol);
    console.log(role)
    //return role === user.role.rol;
    const hasRole = role.includes(user.role.rol);
    if (!hasRole) {
      return false; // Si el usuario no tiene el rol adecuado, se bloquea la acción
      }
      const handlerName = context.getHandler().name; // Obtener el nombre del método
      if (user.role.rol === 'user' && handlerName === 'create') {
        return false; // Bloquear la creación de tareas para usuarios
      }
        console.log(user.role.id);
        console.log(user.userId)
      return true;
    }
  }
