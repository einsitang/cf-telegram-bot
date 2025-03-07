import { TelegramBot, Update } from 'typescript-telegram-bot-api';
import { Env } from './types';

import { AdminBotHandler, ClientBotHandler, BotHandler } from './handlers';

// AI model constants
// const TRANSLATION_AI_MODEL = '@cf/meta/m2m100-1.2b';

export default {
	fetch: async (request: Request, env: Env) => {
		const req = request.clone();

		const bot:TelegramBot = new TelegramBot({
			// localhost:9000 is only for test , use netcat #> nc 9000 -l
			baseURL: 'http://localhost:9000',
			useGetReq: true,
			botToken: env.TELEGRAM_API_TOKEN,
		});
		if (req.method == 'POST') {
			const update = await req.json();
			const botUpdate = update as Update;

			const from = botUpdate.message?.from;
			const chat = botUpdate.message?.chat;
			let botHandler: BotHandler;
			if (from?.id == env.CREATOR_USER_ID || chat?.id == env.CREATOR_USER_ID) {
				// 发送 / 接收 自 创建者的消息
				botHandler = new AdminBotHandler(bot);
			} else {
				botHandler = new ClientBotHandler(bot);
			}

			await botHandler.process(botUpdate);
		} else if (req.method == 'GET') {
			// setting...
			const url = new URL(req.url);
			// local dev only
			url.protocol = 'https';

			if (`/${env.TELEGRAM_API_TOKEN}` !== url.pathname) {
				return new Response('Invalid token', { status: 404 });
			}

			const action = url.searchParams.get('settings');
			if (action === 'setWebhook') {
				await bot.sendMessage({
					chat_id: 7321288148,
					text: 'hello world send by get method request',
				});
				const webhookUrl = new URL(url.origin);
				webhookUrl.pathname = env.TELEGRAM_API_TOKEN;
				console.log('set webHookUrl', webhookUrl.toString());
				await bot
					.setWebhook({
						url: webhookUrl.toString(),
						max_connections: 100,
						allowed_updates: ['message', 'inline_query', 'business_message', 'business_connection'],
						drop_pending_updates: true,
					})
					.then(console.log)
					.catch(console.error);

				// check webhook settings
				await bot.getWebhookInfo().then(console.log).catch(console.error);
			}
		}

		return new Response('ok');
	},
};
//satisfies ExportedHandler<Env>;
