import { Message } from 'typescript-telegram-bot-api';
import BotHandler from './BotHandler';

export default class AdminBotHandler extends BotHandler {
	registerHandlers(): void {
		this.onCommand('start', async (message: Message) => {
			console.log('/start', message);
			await Promise.resolve();
		});
	}
}
