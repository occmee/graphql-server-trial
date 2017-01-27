import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import { schema } from './schema';
import { initTables } from './db/models';

const app = new koa();
const router = new koaRouter();
const port = process.env.PORT || 3000;

// initTables();

app.use(koaBody());
router.post('/graphql', graphqlKoa({ schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
