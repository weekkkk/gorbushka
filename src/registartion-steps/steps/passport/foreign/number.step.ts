import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionForeignPassportStep,
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionStep,
  EGuestSessionType,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { Markup } from 'telegraf';

export const number: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [
    EGuestRegistrationSessionStep.Passport,
    EGuestRegistrationSessionPassportStep.Forign,
    EGuestRegistrationSessionForeignPassportStep.Number,
  ];

  addMessage(
    ctx,
    await ctx.reply(
      '1️⃣ Введите номер своего паспорта',
      Markup.inlineKeyboard([
        Markup.button.callback('Назад', 'passport-forign-back'),
      ]),
    ),
  );
};
