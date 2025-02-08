import { FStep } from 'src/interfaces';
import { EGuestRegistrationSessionStep, EGuestSessionType } from 'src/enums';
import { addMessage } from 'src/utils';
import { buckButton } from 'src/buttons';

export const phone: FStep = async (ctx) => {
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  ctx.session.step = [EGuestRegistrationSessionStep.PhoneNumber];

  addMessage(
    ctx,
    await ctx.reply('📱 Введите свой номер телефона', buckButton),
  );
};
