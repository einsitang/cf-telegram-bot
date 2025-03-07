import { Update, Message, TelegramBot } from 'typescript-telegram-bot-api';

export default abstract class BotHandler {
	bot: TelegramBot;
	commands: Record<string, (message: Message, args: string[]) => Promise<void>>;

	constructor(bot: TelegramBot) {
		this.bot = bot;
		this.commands = {};
		this.registerHandlers();
	}

	async doJob(){
		console.log('do job');
		await fetch('http://localhost:9000');
	}

	async commandParse(message: Message) {
		const text = message.text ?? '';
		const args = text.split(' ');
		const command = args.splice(0, 1)[0];
		if (command.startsWith('/')) {
			console.log('command', command);
			const handler = this.commands[command];
			await handler(message, args);
		}
	}
	onCommand(cmd: string, callback: (message: Message, args: string[]) => Promise<void>) {
		this.commands[cmd] = callback;
	}

	async process(update: Update): Promise<void> {
		console.debug('update info', update);
		this.bot.on('message', (message: Message) => {
			console.log('bot.onMessage');
			this.commandParse(message).then(console.log).catch(console.error);
		});
		await this.bot.processUpdate(update);
	}

	abstract registerHandlers(): void;
}
