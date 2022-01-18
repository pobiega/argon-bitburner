// @ts-check
/** @typedef {import(".").NS} NS */

import { Zerver } from "./Zerver.js";
import { Scheduler } from "./Scheduler.js";
import { WorkQueue } from "./WorkQueue.js";
import { Flags } from "./Flags.js";
import { Deployer } from "./Deployer.js";
import { Cracker } from "./Cracker.js";

/**
 * For distributing hack / grow / weaken threads to attack a set of targets
 * Uses as less RAM as possible (12 - 16GB)
 * 
 * @param {NS} ns
 */
export async function main(ns) {
    ns.disableLog('ALL');

    const flags = new Flags(ns, [
        ["target", [], `Category of targets to attack: ${Object.values(Zerver.MoneyRank).join(", ")}`],
        ["host", Scheduler.WorkerType.NotHome, `Category of hosts to deploy: ${Object.values(Scheduler.WorkerType).join(", ")}`],
        ["take", 0.5, "Percentage of money, wich should be hacked between 0 and 1"],
        ["free", 0, "Amount of GB ram to not use on home server when distributing"],
        ["boost", false, "This will produce new work as long as there's free ram. May cause game crash."],
        ["aggro", false, "Another method of distribution where each ticket starts it's own set of script instead of scripts per target. May cause game crash."],
        ["help", false, ""]
    ]);
    const args = flags.args();

    const servers = Zerver.get(ns);
    const taking = args["take"] - 0;
    const homeRamMinFree = args["free"];
    const workerType = args["host"];
    const doBoost = args["boost"];
    const targetCategories = args["target"];
    const doAggro = args["aggro"];

    const cracker = new Cracker(ns);
    const deployer = new Deployer(ns, cracker);
    const targets = Zerver.filterByMoneyRanks(servers, targetCategories);
    const scheduler = new Scheduler(ns, targets, deployer, workerType, taking, doBoost, doAggro, homeRamMinFree);
    
    await scheduler.init();
    await scheduler.cleanup();    
    await scheduler.deployHacksToServers();

    while (true) {
        await ns.sleep(500);
        scheduler.queueWork();
        await scheduler.run();
        await ns.sleep(500);   
    }  
}