import { createServer, IncomingMessage, ServerResponse } from 'http';
import { TelegramBot, Update } from 'typescript-telegram-bot-api';
import { ClientBotHandler } from './handlers';

const bot = new TelegramBot({
	baseURL: 'http://localhost:9000',
	useGetReq: true,
	botToken: 'fake_token',
});

const botHandler = new ClientBotHandler(bot);

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
	response.on('error', (err) => {
		console.error(err);
	});

	// mock update
	const update = {
		update_id: 1,
		message: {
			message_id: 1,
			text: '/test',
			from: {
				id: 1,
				is_bot: false,
				first_name: 'test',
				last_name: 'test',
				username: 'test',
				language_code: 'en',
			},
			chat: {
				id: 1,
				first_name: 'test',
				last_name: 'test',
			},
		},
	} as Update;

	// do something like index.ts:32
	botHandler.process(update).then(console.log).catch(console.error);

	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end('Hello world!');
});

server.listen(5000);
console.log(`server is running on http://localhost:5000`);
