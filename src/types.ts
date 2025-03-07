export interface Env {
	TELEGRAM_API_TOKEN: string;
	LOCAL: string;
	// bot owner nickname , not bot name
	NICK_NAME?: string;
	// bot creator user id
	CREATOR_USER_ID?: number;
	D1: D1Database;
	AI: Ai;
}
