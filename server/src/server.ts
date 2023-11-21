import express, { json } from "express";

import { appRouter } from "./modules/router";

export const app = express();

app.use(json());
app.use("/", appRouter);

app.listen(3333, () => {
    console.log("Rodando na porta 3333");
});
