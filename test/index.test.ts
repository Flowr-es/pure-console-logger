const originalConsole = console.log;
let lastLog: string;
console.log = (input: string) => {
    lastLog = input;
    originalConsole(input);
}

import { Logger, setLoglevel } from "../src/index";

test("setLogLevel", () =>{
    const logger = new Logger(__filename);
    setLoglevel("INFO");
    logger.info("INFOLOGSTRING");
    logger.debug("DEBUGLOGSTRING");
    expect(lastLog).toContain("INFOLOGSTRING");
    setLoglevel("DEBUG");
    logger.debug("DEBUGLOGSTRING2");
    expect(lastLog).toContain("DEBUGLOGSTRING2");
});

test("logger name", () =>{
    const logger = new Logger("CUSTOMLOGGERNAME");
    logger.info("TEST");
    expect(lastLog).toContain("CUSTOMLOGGERNAME");
});

test("logging meta info", () =>{
    const logger = new Logger(__filename);
    const meta = { foo: "bar" };
    logger.info("TEST", meta);
    Object.keys(meta).forEach( it => {
        expect(lastLog).toContain(it);
        expect(lastLog).toContain(meta[it]);
    })
});

test("logging static info", () =>{
    const meta = { foo: "bar" };
    const logger = new Logger(__filename, meta);
    logger.info("TEST");
    Object.keys(meta).forEach( it => {
        expect(lastLog).toContain(it);
        expect(lastLog).toContain(meta[it]);
    })
});

test("logging content", () =>{
    const logger = new Logger(__filename);
    logger.info("TEST CONTENT");
    expect(lastLog).toContain("TEST CONTENT");
});

// setLoglevel("INFO"); // Sets the loglevel globally
// logger.debug("This is not logged!")
// logger.info(JSON.stringify({ foo: "bar" }));
// logger.warn("This is a warning!", { meta: "data", appended: "to the log string" });
// logger.error("Oops!");
// logger.error(new Error("something bad happended"));

// const loggerWithStaticInfo = new Logger("custom name", { user: "zuse" });
// loggerWithStaticInfo.info("Goodbye!");