// @ts-check
/** @typedef {import(".").NS} NS */

import { Zerver } from "./Zerver.js";
import { Scheduler } from "./Scheduler.js";
import { Purchaser } from "./Purchaser.js";
import { Flags } from "./Flags.js";
import { Cracker } from "./Cracker.js";
import { Deployer } from "./Deployer.js";
import { DistributionMonitor } from "./DistributionMonitor.js";

const TargetType = {
    Worth: "worth",
    Low: "low",
    Mid: "mid",
    High: "high",
}

/**
 * For distributing hack / grow / weaken threads to attack a set of targets
 * 
 * @todo Fine tune distribution: higher available money means easier grow? 
 *       So it would be good to keep servers as near as max money as possible?
 * 
 * @todo When there's alot of RAM available, distirbution only produces a 
 *       load of ~10% and does not run scripts on all servers.
 * 
 * @param {NS} ns
 */
export async function main(ns) {
    ns.disableLog('ALL');

    const flags = new Flags(ns, [
        ["target", [], `Category of targets to attack: ${Object.values(Zerver.MoneyRank).join(", ")}`],
        ["host", Scheduler.WorkerType.All, `Category of hosts to deploy: ${Object.values(Scheduler.WorkerType).join(", ")}`],
        ["take", 0.5, "Percentage of money, wich should be hacked between 0 and 1"],
        ["scale", 0, "Percante of available money between 0 and 1 to regularly buy new servers. 0 means no servers will be bought"],
        ["free", 0, "Amount of GB ram to not use on home server when distributing"],
        ["boost", false, "?"],
        ["silent", false, "Will not produce any output"],
        ["help", false, ""]
    ]);
    
    const args = flags.args();
    ns.tprintf(`\n${flags.cmdLine()} --tail`)

    const taking = args["take"] - 0;
    const scale = args["scale"] - 0;
    const homeRamMinFree = args["free"];
    const workerType = args["host"];
    const silent = args["silent"];
    const targetCategories = args["target"];
    const doBoost = args["boost"];

    const purchaser = new Purchaser(ns, scale, 4);
    const servers = Zerver.get(ns);
    const cracker = new Cracker(ns);
    const deployer = new Deployer(ns, cracker);
    await deployer.deployHacksToServers(servers);

    const targets = Zerver.filterByMoneyRanks(servers, targetCategories);
    const scheduler = new Scheduler(ns, targets, deployer, workerType, taking, doBoost, homeRamMinFree);

    await scheduler.init();

    const monitorTemplate = [
        DistributionMonitor.Templates.Targets,
        DistributionMonitor.Templates.DistSecurity,
        DistributionMonitor.Templates.DistThreadsScheduled,
        DistributionMonitor.Templates.DistThreadsInit,
        DistributionMonitor.Templates.ThreadsInitProgress,
        DistributionMonitor.Templates.DistThreadsWaiting,
        DistributionMonitor.Templates.Line,
        DistributionMonitor.Templates.Load,
        DistributionMonitor.Templates.Money,
    ];

    if (doBoost) monitorTemplate.push(DistributionMonitor.Templates.Boost);
    if (scale > 0) monitorTemplate.push(DistributionMonitor.Templates.Scale);

    const monitor = new DistributionMonitor(ns, scheduler, purchaser, monitorTemplate);

    while (true) {
        await ns.sleep(500);
        if (purchaser.canUpgradeServers()) {
            ns.toast(`Stopping distribution for upgrading servers`, "info", 10000);
            scheduler.cleanup();
            purchaser.upgradeServers();
            await scheduler.init();
        }

        scheduler.queueWork();
        await scheduler.run();
        await ns.sleep(500);

        if (silent) continue;

        monitor.display();
    }
}

