const originalConsoleLog = console.log;
const originalConsoleError = console.error;
let lastLog: string;
console.log = (input: string) => {
    lastLog = input;
    originalConsoleLog(input);
}
let lastLogError: string;
console.error = (input: string) => {
    lastLogError = input;
    originalConsoleLog(input);
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

test("logging error", () =>{
    const logger = new Logger(__filename);
    const logInput = new Error("TEST CONTENT ERROR")
    logger.error(logInput);
    expect(lastLogError).toContain(logInput.message);
});
