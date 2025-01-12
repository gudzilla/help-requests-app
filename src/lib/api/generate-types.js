import path, { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';

generateApi({
  name: 'api.ts',
  output: resolve(process.cwd(), './'),
  input: './apispec.yaml',
  generateClient: true,
  generateUnionEnums: true,
  httpClientType: 'fetch',
});
