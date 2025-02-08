import { EGuestSessionType, ESessionRole } from 'src/enums';
import { ISession } from '../session.interface';
import { TGuestRegistrationSession } from './registration';

export type TGuestSession =
  | ISession<ESessionRole.Guest, EGuestSessionType.Menu>
  | TGuestRegistrationSession;
