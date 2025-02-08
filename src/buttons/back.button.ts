import { Markup } from 'telegraf';

export const buckButton = Markup.inlineKeyboard([
  Markup.button.callback('Назад', 'back'),
]);
