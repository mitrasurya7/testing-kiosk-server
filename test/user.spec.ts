import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);
    testService = app.get<TestService>(TestService);
  });

  describe('/api/users (POST)', () => {
    beforeEach(async () => {
      await testService.deleteUser('admintest');
    });

    it('should create new user failed', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          email: '',
          password: '',
          role: '',
          locationId: null,
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should create new user success', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'admintest',
          email: 'admintest@mail.com',
          password: 'password',
          role: 'admin',
          locationId: 3,
        });

      logger.info(response.body);
      expect(response.status).toBe(201);
      expect(response.body.data.username).toBe('admintest');
      expect(response.body.data.email).toBe('admintest@mail.com');
    });

    it('should be rejected when username already exists', async () => {
      await testService.RegisterUser('admintest');

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'admintest',
          email: 'admintest@mail.com',
          password: 'password',
          role: 'admin',
          locationId: 3,
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('/api/users/login (POST)', () => {
    beforeEach(async () => {
      await testService.deleteUser('admintest');
      await testService.RegisterUser('admintest');
    });

    it('should login user failed if wrong password or username', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'admintest1',
          password: 'pass',
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBe('username or password is incorrect');
    });

    it('should login user failed if wrong password or username is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should login user success', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'admintest',
          password: 'password',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('admintest');
      expect(response.body.data.email).toBe('admintest@mail.com');
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe('/api/users/logout (DELETE)', () => {
    beforeEach(async () => {
      await testService.deleteUser('admintest');
      await testService.RegisterUser('admintest');
      await testService.LoginUser('admintest');
    });

    it('should logout user success', async () => {
      const token = await testService.getToken('admintest');
      const response = await request(app.getHttpServer())
        .delete('/api/users/logout')
        .set({
          Authorization: token,
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });

    it('should logout user failed', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/api/users/logout',
      );

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });
  });
});
