import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '해윙~';
  }

  async test(): Promise<number> {
    const test = await import('@wasm/pkg').then((wasm) => {
      const result = wasm.test();
      return result;
    });

    return test;
  }
}
