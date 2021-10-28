import { Logger, setLoglevel } from "./../src/index";
const logger = new Logger(__filename);

setLoglevel("INFO"); // Sets the loglevel globally
logger.debug("This is not logged!")
logger.info(JSON.stringify({ foo: "bar" }));
logger.warn("This is a warning!", { meta: "data", appended: "to the log string" });
logger.error("Oops!");
logger.error(new Error("something bad happended"));

const loggerWithStaticInfo = new Logger("custom name", { user: "zuse" });
loggerWithStaticInfo.info("Goodbye!");