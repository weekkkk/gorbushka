import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionRfPassportStep,
  EGuestRegistrationSessionStep,
  EGuestSessionType,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { buckButton } from 'src/buttons';

export const registration: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [
    EGuestRegistrationSessionStep.Passport,
    EGuestRegistrationSessionPassportStep.Rf,
    EGuestRegistrationSessionRfPassportStep.Registration,
  ];

  addMessage(ctx, await ctx.reply('🏗️ Введите свою прописку', buckButton));
};
