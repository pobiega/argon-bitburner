/* eslint-disable @typescript-eslint/no-explicit-any */
import { NS } from "@ns";
import { toPrintableType } from "/lib/utils";

/**
 * todo add short flag support (e.g. -h)
 * 
 * Decorator for adding new featues to the ns.flags() method
 */
export class Flags {

    static ParamFlag = "_";
    static ParamAllFlag = "...";

    ns: NS
    script: string
    nsFlags: [string, string | number | boolean | string[]][]
    paramDefaults: [string, string | number | boolean | string[]][]
    flagSchemas: [string, string | number | boolean | string[], string][]
    
    constructor(ns : NS, flagSchemas : [string, string | number | boolean | string[], string][]) {
        this.ns = ns;
        this.script = ns.getScriptName();

        if (!Array.isArray(flagSchemas)) {
            throw new Error("flagSchemas is not an Array, is: " + typeof flagSchemas);
        }
        
        this.flagSchemas = flagSchemas;
        this.nsFlags = [];
        this.paramDefaults = [];

        for (const flag of this.flagSchemas) {
            if (flag[0] === Flags.ParamFlag || flag[0] === Flags.ParamAllFlag) {
                this.paramDefaults.push([flag[0], flag[1]]);
            } else {
                this.nsFlags.push([flag[0], flag[1]]);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allArgs() : any[] {
        return this.ns.args;
    }

    isPresent(name : string) : boolean {
        return this.allArgs().indexOf(`--${name}`) !== -1;
    }

    /**
     * @returns {string}
     */
    cmdLine() : string {
       return ["run", this.script].concat(...this.allArgs()).join(" ");
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args() : any {
        const args : any = this.ns.flags(this.nsFlags);
        const params : any = args._;

        for (const i in this.paramDefaults) {
            if (typeof params[i] !== "undefined" && params[i] !== "") {
               continue;
            }

            args._[i] = this.paramDefaults[i][1];
        }
       
        if (typeof args["help"] !== "undefined" && args["help"] === true) {
            throw `Usage:\n${this.toString()}`;
        }

        return args;
    }

    toString() : string {
        const lines = [];

        for (const flag of this.flagSchemas) {
            let param = `${flag[0]}`;

            if (param !== Flags.ParamAllFlag && param !== Flags.ParamFlag) {
                param = `--${param}`;
            }

            lines.push(`${param} ${(this.defaultToString(flag[1]))}${this.descriptionToString(flag[2])}`);
        }

        return lines.join("\n");
    }

    defaultToString(defaultValue? : string | number | boolean | string[]) : string {
        if (typeof defaultValue === "undefined" || defaultValue === "") {
            return "";
        }

        return `${toPrintableType(defaultValue, '"', "whitespace")}`;
    }

    descriptionToString(desc? : string) : string {
        if (typeof desc === "undefined") {
            return "";
        }

        return ` - ${desc}`;
    }
}


