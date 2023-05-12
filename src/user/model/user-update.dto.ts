import { UserType } from './user.entity';

export class UserUpdateDto implements Partial<UserType> {
  nick_name?: string;
  email?: string;
  profile_img?: string;
}
