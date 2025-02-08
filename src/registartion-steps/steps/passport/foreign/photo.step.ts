import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionForeignPassportStep,
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionStep,
  EGuestSessionType,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { Markup } from 'telegraf';

export const photo: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [
    EGuestRegistrationSessionStep.Passport,
    EGuestRegistrationSessionPassportStep.Forign,
    EGuestRegistrationSessionForeignPassportStep.GeneralPhoto,
  ];

  addMessage(
    ctx,
    await ctx.reply(
      '📸 Отравьте фото своего паспорта',
      Markup.inlineKeyboard([
        Markup.button.callback('Назад', 'passport-forign-back'),
      ]),
    ),
  );
};
