import { Hono } from "hono";
import { configure, jsonLinesFormatter, getLogger, getConsoleSink } from "@logtape/logtape";

import { characters } from "./engine";

const app = new Hono();

await configure({
    sinks: {
        console: getConsoleSink({ formatter: jsonLinesFormatter }),
    },
    loggers: [
        { category: ["logtape", "meta"], sinks: ["console"] },
        { category: "opdon", lowestLevel: "debug", sinks: ["console"] },
    ],
});

const logger = getLogger("opdon");

app.get("/", (c) => {
    return c.text("Hello Opdon!");
});

app.get("/hello/:name", (c) => {
    const { name } = c.req.param();
    return c.text(`Hello ${name}!`);
});

app.get("/cards", (c) => {
    return c.json(Object.values(characters));
});

logger.info("Starting Opdon server...");

export default { port: 3000, fetch: app.fetch };
