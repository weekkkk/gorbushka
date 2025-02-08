import { FStep, Context } from 'src/interfaces';
import {
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionRfPassportStep,
  EGuestRegistrationSessionStep,
  EGuestSessionType,
} from 'src/enums';
import { addMessage } from 'src/utils';
import { buckButton } from 'src/buttons';

export const registrationPhoto: FStep = async (ctx: Context) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [
    EGuestRegistrationSessionStep.Passport,
    EGuestRegistrationSessionPassportStep.Rf,
    EGuestRegistrationSessionRfPassportStep.RegistrationPhoto,
  ];

  addMessage(
    ctx,
    await ctx.reply('📸 Отравьте фото своей прописки', buckButton),
  );
};
