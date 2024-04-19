import { INestApplication } from '@nestjs/common';
import { Logger } from 'winston';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TestModule } from './test.module';
import { AppModule } from '../src/app.module';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';

describe('TemplateController', () => {
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

  describe('/api/templates (POST)', () => {
    beforeEach(async () => {
      await testService.deleteUser('admintest1');
      await testService.RegisterUser('admintest1');
      await testService.LoginUser('admintest1');
      await testService.deleteTemplate('template 1');
    });
    it('should create new template', async () => {
      const token = await testService.getToken('admintest1');
      const response = await request(app.getHttpServer())
        .post('/api/templates')
        .set({
          Authorization: token,
        })
        .send({
          name: 'template 1',
          html_template: '<html>.....</html>',
        });

      logger.info(response.body);
      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();
    });

    it('should create new template failed', async () => {
      const token = await testService.getToken('admintest1');
      const response = await request(app.getHttpServer())
        .post('/api/templates')
        .set({
          Authorization: token,
        })
        .send({
          name: '',
          html_template: '<html>.....</html>',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
