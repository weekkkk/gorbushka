import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionStep,
  EGuestSessionType,
  ESessionRole,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { Markup } from 'telegraf';

export const role: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [EGuestRegistrationSessionStep.Role];

  addMessage(
    ctx,
    await ctx.reply(
      '🚹 Выберите свою роль',
      Markup.inlineKeyboard(
        [
          Markup.button.callback('Покупатель', ESessionRole.Buyer),
          Markup.button.callback('Продавец', ESessionRole.Sailer),
          Markup.button.callback(
            'Покупатель и Продавец',
            ESessionRole.BuyerSailer,
          ),
          Markup.button.callback('Назад', 'back'),
        ],
        { columns: 3 },
      ),
    ),
  );
};
