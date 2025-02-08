import {
  EGuestRegistrationSessionForeignPassportStep,
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionRfPassportStep,
  EGuestRegistrationSessionStep,
} from 'src/enums';
import * as steps from './steps';
import { TStep } from 'src/interfaces';

export const registartionSteps: TStep<
  EGuestRegistrationSessionStep,
  [
    TStep<
      EGuestRegistrationSessionPassportStep,
      TStep<EGuestRegistrationSessionRfPassportStep>[]
    >,
    TStep<
      EGuestRegistrationSessionPassportStep,
      TStep<EGuestRegistrationSessionForeignPassportStep>[]
    >,
  ]
>[] = [
  { id: EGuestRegistrationSessionStep.Name, f: steps.name },
  { id: EGuestRegistrationSessionStep.Photo, f: steps.photo },
  { id: EGuestRegistrationSessionStep.PhoneNumber, f: steps.phone },
  { id: EGuestRegistrationSessionStep.Role, f: steps.role },
  {
    id: EGuestRegistrationSessionStep.Passport,
    f: steps.passport.start,
    steps: [
      {
        id: EGuestRegistrationSessionPassportStep.Rf,
        f: async () => {},
        steps: [
          {
            id: EGuestRegistrationSessionRfPassportStep.GeneralPhoto,
            f: steps.passport.rf.photo,
          },
          {
            id: EGuestRegistrationSessionRfPassportStep.RegistrationPhoto,
            f: steps.passport.rf.registrationPhoto,
          },
          {
            id: EGuestRegistrationSessionRfPassportStep.Number,
            f: steps.passport.rf.number,
          },
          {
            id: EGuestRegistrationSessionRfPassportStep.Date,
            f: steps.passport.rf.date,
          },
          {
            id: EGuestRegistrationSessionRfPassportStep.Registration,
            f: steps.passport.rf.registration,
          },
        ],
      },
      {
        id: EGuestRegistrationSessionPassportStep.Forign,
        f: async () => {},
        steps: [
          {
            id: EGuestRegistrationSessionForeignPassportStep.GeneralPhoto,
            f: steps.passport.foreign.photo,
          },
          {
            id: EGuestRegistrationSessionForeignPassportStep.Number,
            f: steps.passport.foreign.number,
          },
          {
            id: EGuestRegistrationSessionForeignPassportStep.Date,
            f: steps.passport.foreign.date,
          },
          {
            id: EGuestRegistrationSessionForeignPassportStep.Term,
            f: steps.passport.foreign.term,
          },
        ],
      },
    ],
  },
];
