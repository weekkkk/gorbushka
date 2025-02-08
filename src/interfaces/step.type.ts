import { Context } from 'src/interfaces';

export type FStep = (ctx: Context) => Promise<void>;

export type TStep<I extends keyof any, S extends Array<any> = []> = {
  id: I;
  f: FStep;
  steps?: S;
};
