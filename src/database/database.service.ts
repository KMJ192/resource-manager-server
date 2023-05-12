import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public CP: mysql.Pool;

  onModuleInit = async () => {
    if (mysql) {
      const config = {
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        port: 3307,
        database: 'resource_manager',
        connectionLimit: 3,
      };

      this.CP = mysql.createPool(config);

      console.log(`✅ START MYSQL CONNECTION.`);
    }
  };
}
