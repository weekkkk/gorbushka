import {
  EGuestRegistrationSessionPassportStep,
  EGuestSessionType,
  ESessionRole,
} from 'src/enums';
import { ISession } from '../../session.interface';
import {
  EGuestRegistrationSessionStep,
  EGuestRegistrationSessionRfPassportStep,
  EGuestRegistrationSessionForeignPassportStep,
} from 'src/enums';

type Step<S, B = undefined, C = undefined> = C extends undefined
  ? B extends undefined
    ? [S]
    : [S, B]
  : [S, B, C];

export type TGuestRegistrationSession = ISession<
  ESessionRole.Guest,
  EGuestSessionType.Registation
> & {
  step?:
    | Step<
        EGuestRegistrationSessionStep.Passport,
        EGuestRegistrationSessionPassportStep,
        EGuestRegistrationSessionRfPassportStep
      >
    | Step<
        EGuestRegistrationSessionStep.Passport,
        EGuestRegistrationSessionPassportStep,
        EGuestRegistrationSessionForeignPassportStep
      >
    | Step<EGuestRegistrationSessionStep>;
};
