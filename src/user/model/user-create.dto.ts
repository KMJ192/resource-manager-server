import { UserType } from './user.entity';

export class UserCreateDto implements UserType {
  email: string;
  nick_name: string;
  password: string;
  profile_img: string;
  rol_id: string;
}
