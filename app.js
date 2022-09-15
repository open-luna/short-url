const Koa = require('koa');
const redis = require('redis')
const app = new Koa();
app.use(async ctx => {
    const key = ctx.request.url
    const client = redis.createClient({url: process.env.REDIS})
    await client.connect();
    const value = await client.exists(key);
    if (value) {
        ctx.status = 302
        ctx.redirect(await client.get(key));
    } else {
        ctx.body = 'not found'
    }
});

app.listen(9000);
