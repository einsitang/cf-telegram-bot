# cf-telegram-bot

cloudflare telegram bot

## install

pnpm install

## dependencies

`@typescript-telegram-bot`

## dev

copy file `.dev.vars.template` to `.dev.vars`

modify .dev.vars content with your secret key

run `wrangler dev`

like:

```
pnpm wrangler dev
```

set telegram webhook run :

```
curl http://localhost:8787/${TELEGRAM_API_TOKEN}?settings=setWebhook
```

## test
