import express, { Express, Request, Response } from "express";
import { bot} from "./src/bot"
import { APPLICATION } from "./src/config";


const app: Express = express();

const port=APPLICATION.port



app.listen(port, () => {
    console.log("Example app listening on port "+port+"!");
    bot.start().then(() => console.log("bot started")).catch((err) => console.log(err));
});
