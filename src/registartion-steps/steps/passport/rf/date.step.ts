import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionRfPassportStep,
  EGuestRegistrationSessionStep,
  EGuestSessionType,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { buckButton } from 'src/buttons';

export const date: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [
    EGuestRegistrationSessionStep.Passport,
    EGuestRegistrationSessionPassportStep.Rf,
    EGuestRegistrationSessionRfPassportStep.Date,
  ];

  addMessage(
    ctx,
    await ctx.reply('📆 Введите дату выдачи своего паспорта', buckButton),
  );
};
