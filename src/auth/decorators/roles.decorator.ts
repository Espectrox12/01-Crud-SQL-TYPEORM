import { SetMetadata } from "@nestjs/common";

//export const Roles = (role) => SetMetadata('roles', role);
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);