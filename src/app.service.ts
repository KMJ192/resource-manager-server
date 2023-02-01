import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async test(): Promise<number> {
    const test = await import('@root/wasm_module/pkg').then((wasm) => {
      const result = wasm.test();
      return result;
    });

    return test;
  }
}
