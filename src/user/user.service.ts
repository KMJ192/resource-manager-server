import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { DatabaseService } from '../database/database.service';
import { LoginType, UserType } from './model/user.entity';

@Injectable()
export class UserService {
  constructor(private dbConn: DatabaseService) {}

  async lastId() {
    const [list] = await this.dbConn.CP.query('SELECT MAX(id) from user;');
    return list[0]['MAX(id)'] ?? 0;
  }

  async getUserInfo(email: string) {
    const query = `SELECT * FROM user WHERE email = "${email}";`;

    const [list] = await this.dbConn.CP.query(query);

    if (Array.isArray(list) && list.length > 0) {
      const user = list[0] as UserType;

      return {
        isUser: true,
        password: user.password ?? '',
      };
    }
    return {
      isUser: false,
    };
  }

  async login(loginInfo: LoginType) {
    const { isUser, password } = await this.getUserInfo(loginInfo.email);

    if (!isUser) {
      return {
        status: 0,
        message: 'Not found user',
        error: {
          code: 'E-000',
        },
      };
    }

    if (!(await compare(loginInfo.password, password))) {
      return {
        status: 0,
        message: 'Invalid credentials',
        error: {
          code: 'E-001',
        },
      };
    }

    const userInfo = this.getUserInfo(loginInfo.email);

    return {
      status: 1,
      ...userInfo,
    };
  }

  async create({
    email = '',
    nick_name = '',
    password = '',
    profile_img = '',
  }: UserType) {
    if (email === '' || password === '') {
      return {
        status: 0,
        message: 'validate user info',
        error: {
          code: 'E-001',
        },
      };
    }

    let last: any = await this.lastId();
    if (typeof last !== 'number') {
      last = -1;
    }

    const pw = await hash(password, 12);

    const query = `INSERT INTO resource_manager.user VALUES(
      ${last + 1},
      1,
      "${nick_name || email}",
      "${email}",
      "${pw}",
      "${profile_img}"
    );`;

    try {
      await this.dbConn.CP.query(query);
    } catch (e) {
      return {
        status: 0,
        error: {
          code: 'E-000',
          message: e.message ?? 'Server error',
        },
      };
    }

    return {
      status: 1,
      success: {
        message: 'Completed create user',
      },
      email: email,
      nick_name: nick_name,
    };
  }

  async update() {
    return {
      status: 1,
    };
  }

  async delete() {
    return {
      status: 1,
    };
  }
}
