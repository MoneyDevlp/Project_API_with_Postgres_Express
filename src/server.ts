import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import productRouter from './handlers/product';
import userRouter from './handlers/user';
import orderRouter from './handlers/order';
import dashboardRouter from './handlers/dashboard';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRouter(app);
userRouter(app);
orderRouter(app);
dashboardRouter(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;