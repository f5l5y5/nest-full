import { Module, MiddlewareConsumer } from '@nestjs/common';

import * as session from 'express-session';

@Module({})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'taoism',
          rolling: true,
          name: 'taoism-sid',
          // resave: false,
          // saveUninitialized: true,
          cookie: {
            // httpOnly: false,
            // secure: false,
            // maxAge: 1000 * 60 * 60 * 24, // 1 day
            maxAge: null, // 1 day
          },
        }),
      )
      .forRoutes('*');
  }
}
