# pure-console-logger

![Version](https://img.shields.io/npm/v/pure-console-logger.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/pure-console-logger.svg?style=flat)
![License](https://img.shields.io/npm/l/pure-console-logger.svg?style=flat)


[![NPM](https://nodei.co/npm/pure-console-logger.png?downloads=true&downloadRank=true)](https://nodei.co/npm/pure-console-logger/)

Yet antoher logger, nobody asked for. 

Super simple & provides good human debugable logs to the console.

Easy to use, small focus - very useful for small "diy" projects.
___

## Usage

### Usage example

A simple example how to use this module. Copied from here [example.ts](src/example.ts)
```typescript
import { Logger, setLoglevel } from "pure-console-logger";
const logger = new Logger(__filename);

setLoglevel("INFO"); // Sets the loglevel globally
logger.debug("This is not logged!")
logger.info(JSON.stringify({ foo: "bar" }));
logger.warn("This is a warning!", { meta: "data", appended: "to the log string" });
logger.error("Oops!");
logger.error(new Error("something bad happended"));

const loggerWithStaticInfo = new Logger("custom name", { user: "zuse" });
loggerWithStaticInfo.info("Goodbye!");
```

### Loglevels

1. ERROR
2. WARN
3. INFO
4. DEBUG


## CONTRIBUTORS
Feel free to contribute - pull requests and issues are welcome :)

## LICENSE

SEE LICENSE FILE