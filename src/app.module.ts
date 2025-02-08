import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({ database: 'session_db.json' });
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '7390130707:AAFymnExmWDk_5Z5Q4Dupbt256zRs0st5Oo',
    }),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
