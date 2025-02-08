import { Context as ContextTelegraf } from 'telegraf';
import { TGuestSession } from './sessions';

export interface Context extends ContextTelegraf {
  session: TGuestSession;
}
