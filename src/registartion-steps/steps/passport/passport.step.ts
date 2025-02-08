import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionStep,
  EGuestSessionType,
  EGuestRegistrationSessionPassportStep,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { Markup } from 'telegraf';

export const start: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [EGuestRegistrationSessionStep.Passport];

  addMessage(
    ctx,
    await ctx.reply(
      '📄 Выберите вид своего паспорта',
      Markup.inlineKeyboard(
        [
          Markup.button.callback(
            'РФ',
            EGuestRegistrationSessionPassportStep.Rf,
          ),
          Markup.button.callback(
            'Иностанный',
            EGuestRegistrationSessionPassportStep.Forign,
          ),
          Markup.button.callback('Назад', 'back'),
        ],
        { columns: 2 },
      ),
    ),
  );
};
