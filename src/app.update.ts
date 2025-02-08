import { AppService } from './app.service';
import {
  Action,
  Ctx,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf, Markup } from 'telegraf';
import { Context } from './interfaces';
import {
  EGuestRegistrationSessionPassportStep,
  EGuestRegistrationSessionStep,
  EGuestSessionType,
  ESessionRole,
} from './enums';
import { registartionSteps } from './registartion-steps';
import { Message as M } from 'telegraf/typings/core/types/typegram';
import { addMessage, clearChat, debounce } from './utils';

const next = async (ctx: Context) => {
  if (ctx.session.role !== ESessionRole.Guest) return;
  if (ctx.session.type !== EGuestSessionType.Registation) return;
  const sessionStep = ctx.session.step;

  const index =
    (sessionStep &&
      registartionSteps.findIndex(({ id }) => id === sessionStep.at(0))) ??
    -1;

  const step = registartionSteps[index + 1];

  if (!step) return;

  await clearChat(ctx);

  await step.f(ctx);
};

const debouncedNext = debounce(next);

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async start(ctx: Context) {
    const isAdmin = false;

    if (!isAdmin) ctx.session.role = ESessionRole.Guest;

    switch (ctx.session.role) {
      case ESessionRole.Guest:
        addMessage(
          ctx,
          await ctx.reply(
            'Добро пожаловать в систему! ✋',
            Markup.inlineKeyboard([
              Markup.button.callback('Пройти верификацию', 'registration'),
            ]),
          ),
        );
        break;
    }
  }

  @Action('registration')
  async registration(ctx: Context) {
    if (ctx.session.role !== ESessionRole.Guest) return;

    ctx.session.type = EGuestSessionType.Registation;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    ctx.session.step = undefined;

    await this.next(ctx);
  }

  @Action('back')
  async back(ctx: Context) {
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    const sessionStep = ctx.session.step;

    const index =
      sessionStep &&
      registartionSteps.findIndex(({ id }) => id === sessionStep.at(0));

    if (!index || index === -1) {
      await clearChat(ctx);
      await this.start(ctx);
      return;
    }

    const step = registartionSteps[index - 1];
    if (!step) return;

    await clearChat(ctx);

    await step.f(ctx);
  }
  @Action('next')
  async next(ctx: Context) {
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    const sessionStep = ctx.session.step;

    const index =
      (sessionStep &&
        registartionSteps.findIndex(({ id }) => id === sessionStep.at(0))) ??
      -1;

    const step = registartionSteps[index + 1];

    if (!step) return;

    await clearChat(ctx);

    await step.f(ctx);
  }

  @Action(ESessionRole.Buyer)
  async buyer(ctx: Context) {
    await this.next(ctx);
  }
  @Action(ESessionRole.Sailer)
  async sailer(ctx: Context) {
    await this.next(ctx);
  }
  @Action(ESessionRole.BuyerSailer)
  async buyerSailer(ctx: Context) {
    await this.next(ctx);
  }

  @Action('passport-rf-next')
  async passportRfNext(ctx: Context) {
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    const sessionStep = ctx.session.step;

    const steps = registartionSteps
      .find(({ id }) => id === EGuestRegistrationSessionStep.Passport)
      ?.steps?.find(
        ({ id }) => id === EGuestRegistrationSessionPassportStep.Rf,
      )?.steps;
    if (!steps) return;

    const index =
      (sessionStep && steps.findIndex(({ id }) => id === sessionStep.at(2))) ??
      -1;

    const step = steps?.at(index);

    if (!step) return;

    await clearChat(ctx);

    await step.f(ctx);
  }
  @Action('passport-rf-back')
  async passportRfBack(ctx: Context) {
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    const sessionStep = ctx.session.step;

    const steps = registartionSteps
      .find(({ id }) => id === EGuestRegistrationSessionStep.Passport)
      ?.steps?.find(
        ({ id }) => id === EGuestRegistrationSessionPassportStep.Forign,
      )?.steps;
    if (!steps) return;

    const index =
      sessionStep && steps.findIndex(({ id }) => id === sessionStep.at(2));

    if (!index || index === -1) {
      await clearChat(ctx);
      await this.start(ctx);
      return;
    }

    const step = steps[index - 1];
    if (!step) return;

    await clearChat(ctx);

    await step.f(ctx);
  }
  @Action(EGuestRegistrationSessionPassportStep.Rf)
  async rf(ctx: Context) {
    await this.passportRfNext(ctx);
  }
  @Action('passport-forign-next')
  async passportForignNext(ctx: Context) {
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    const sessionStep = ctx.session.step;

    const steps = registartionSteps
      .find(({ id }) => id === EGuestRegistrationSessionStep.Passport)
      ?.steps?.find(
        ({ id }) => id === EGuestRegistrationSessionPassportStep.Forign,
      )?.steps;
    if (!steps) return;

    const index =
      (sessionStep && steps.findIndex(({ id }) => id === sessionStep.at(2))) ??
      -1;

    const step = steps?.at(index + 1);

    if (!step) return;

    await clearChat(ctx);

    await step.f(ctx);
  }
  @Action('passport-forign-back')
  async passportForignBack(ctx: Context) {
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    const sessionStep = ctx.session.step;

    const steps = registartionSteps
      .find(({ id }) => id === EGuestRegistrationSessionStep.Passport)
      ?.steps?.find(
        ({ id }) => id === EGuestRegistrationSessionPassportStep.Forign,
      )?.steps;
    if (!steps) return;

    const index =
      sessionStep && steps.findIndex(({ id }) => id === sessionStep.at(0));

    console.log(index);
    if (!index || index === -1) {
      await clearChat(ctx);
      ctx.session.step = [EGuestRegistrationSessionStep.Role];
      await this.next(ctx);
      return;
    }

    const step = steps[index - 1];
    if (!step) return;

    await clearChat(ctx);

    await step.f(ctx);
  }
  @Action(EGuestRegistrationSessionPassportStep.Forign)
  async forign(ctx: Context) {
    await this.passportForignNext(ctx);
  }

  @On('text')
  async handleText(@Message() message: M.TextMessage, @Ctx() ctx: Context) {
    addMessage(ctx, message);
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    if (!ctx.session.step) return;

    switch (ctx.session.step.at(0)) {
      case EGuestRegistrationSessionStep.Name:
        await this.next(ctx);
        break;
      case EGuestRegistrationSessionStep.PhoneNumber:
        await this.next(ctx);
        break;
    }
  }
  @On('photo')
  handlePhoto(@Message() message: M.PhotoMessage, @Ctx() ctx: Context) {
    addMessage(ctx, message);
    if (ctx.session.role !== ESessionRole.Guest) return;
    if (ctx.session.type !== EGuestSessionType.Registation) return;
    if (!ctx.session.step) return;

    switch (ctx.session.step.at(0)) {
      case EGuestRegistrationSessionStep.Photo:
        debouncedNext(ctx);
        break;
    }
  }

  @On('message')
  handleMessage(@Message() message: M, @Ctx() ctx: Context) {
    addMessage(ctx, message);
  }
}
