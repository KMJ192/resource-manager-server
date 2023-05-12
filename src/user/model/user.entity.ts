export type UserType = {
  nick_name: string;
  email: string;
  password: string;
  profile_img: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export class UserEntity implements UserType {
  id: number;
  rol_id: 0 | 1;
  nick_name: string;
  email: string;
  password: string;
  profile_img: string;
}

/*
CREATE TABLE `resource_manager`.`new_table` (
  `id` INT NOT NULL,
  `rol_id` INT NOT NULL,
  `nick_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(55) NOT NULL,
  `profile_img` VARCHAR(100) NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`id`));
*/
