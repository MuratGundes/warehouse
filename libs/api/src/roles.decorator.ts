import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from 'libs/api/role.enum';

export const Roles = (...roles: Array<Role>): CustomDecorator<string> =>
  SetMetadata('roles', roles);
