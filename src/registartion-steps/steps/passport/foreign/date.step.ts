import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionForeignPassportStep,
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionStep,
  EGuestSessionType,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { Markup } from 'telegraf';

export const date: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [
    EGuestRegistrationSessionStep.Passport,
    EGuestRegistrationSessionPassportStep.Forign,
    EGuestRegistrationSessionForeignPassportStep.Date,
  ];

  addMessage(
    ctx,
    await ctx.reply(
      '📆 Введите дату выдачи своего паспорта',
      Markup.inlineKeyboard([
        Markup.button.callback('Назад', 'passport-forign-back'),
      ]),
    ),
  );
};
