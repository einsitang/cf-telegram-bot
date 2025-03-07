import { Message } from 'typescript-telegram-bot-api';
import BotHandler from './BotHandler';

export default class ClientBotHandler extends BotHandler {
	registerHandlers(): void {

		this.onCommand('/test', async (message: Message) => {
			console.log('/test', message);
			// 👇👇👇here not working ... and always pending in network and I have not idea
			console.log('begin command /test : fetch url -> http://localhost:9000/test');
			await fetch('http://localhost:9000/test');
			// await this.bot.sendMessage({
			// 	chat_id: message.chat.id,
			// 	text: 'this is test command',
			// });
		});
		this.onCommand('/start', async (message: Message) => {
			console.log('/start', message);
			await Promise.resolve();
		});
	}
}
