import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import convert from 'koa-convert';
import graphqlHTTP from 'koa-graphql';
import { schema } from './schema';

const app = new koa();
const router = new koaRouter();
const PORT = process.env.PORT || 3000;

router.all('/graphql', convert(graphqlHTTP({
  schema,
  graphiql: true
})));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`);
});