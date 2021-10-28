"use strict";
/* eslint-disable no-console */
import * as path from "path";
export type loglevel = "ERROR" | "WARN" | "INFO" | "DEBUG";
const _loglevels: loglevel[] = ["ERROR", "WARN", "INFO", "DEBUG"];
let LOGLEVELS: loglevel[] = _loglevels;
const setLoglevel = (level: loglevel) => {
    LOGLEVELS = _loglevels.slice(0, _loglevels.indexOf(level) + 1);
}

class Logger {
    private name: string;
    private logInfo: string;
    
    /**
     * @param  {string} name can be the pure name or the filename
     * @param  {any} staticInfo?
     */
    constructor(name: string, staticInfo?: any) {
        name = path.basename(name, ".js");
        this.name = name.toUpperCase();
        this.logInfo = ``;
        if (staticInfo) {
            Object.keys(staticInfo).forEach((it) => {
                this.logInfo += `${it}:${staticInfo[it]} `;
            });
        }
    }
    
    public static getLogName(context: string):string {
        return path.basename(context, ".js");
    }
    
    private formatter(level: loglevel, message: string, meta?: any) {
        let metaInfo = ``;
        if (meta) {
            Object.keys(meta).forEach((it) => {
                metaInfo += `${it}:${meta[it]} `;
            });
        }
        return `${new Date().toISOString()} ${level}: [${this.name}] ${message} - ${metaInfo} ${this.logInfo}`;
    }
    
    public info(msg: string, meta?: any) {
        const level = "INFO";
        if (LOGLEVELS.indexOf(level) === -1) {
            return;
        }
        console.log(this.formatter(level, msg, meta));
    }

    public error(msg: string | Error, meta?: any) {
        const level = "ERROR";
        if (LOGLEVELS.indexOf(level) === -1) {
            return;
        }
        if (msg && typeof msg !== "string" && msg.message) {
            console.log(this.formatter(level, msg.stack, meta));
            msg = msg.message;
        }
        console.error(this.formatter(level, msg as string, meta));
    }

    public warn(msg: string, meta?: any) {
        const level = "WARN";
        if (LOGLEVELS.indexOf(level) === -1) {
            return;
        }
        console.log(this.formatter(level, msg, meta));
    }

    public debug(msg: string, meta?: any) {
        const level = "DEBUG";
        if (LOGLEVELS.indexOf(level) === -1) {
            return;
        }
        console.log(this.formatter(level, msg, meta));
    }

}

export { Logger, setLoglevel };
