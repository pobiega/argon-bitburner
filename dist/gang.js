import { Flags } from "lib/Flags";
import { Chabo, Task } from "/gang/Chabo";
import { TaskQueue } from "/gang/TaskQueue";
import { Babo } from "/gang/Babo";
import { GangConfig, GangConfigGenerator } from "/gang/GangConfig";
/**
 * For managing your Gang (WIP) o.O
 */
export async function main(ns) {
    const flags = new Flags(ns, [
        ["...", [""], `Nam(e) of gang member(s) to do either --work or --train `],
        ["config", "default", `Use configuration file for gang by alias`],
        ["work", "", `Do work by type ${Object.values(TaskQueue.Work).join(", ")}`],
        ["task", "", `Do specific task ${Object.values(Task.Names).join(", ")}.`],
        ["train", "", `Do train for task: ${Object.values(Task.Names).join(", ")}.`],
        ["help", false, "For managing your gang (WIP)"]
    ]);
    const args = flags.args();
    ns.tprintf(`\n${flags.cmdLine()} --tail`);
    const chaboNames = args._;
    const workType = args["work"];
    const trainTask = args["train"];
    const taskName = args["task"];
    const configAlias = args["config"];
    let babo;
    if (configAlias !== "") {
        const gangConfigData = GangConfigGenerator.readAlias(ns, configAlias);
        if (_.isUndefined(gangConfigData)) {
            ns.tprintf(`ERROR Babo could not load gang config ${configAlias}`);
            return;
        }
        const gangConfig = GangConfig.fromObjectArray(gangConfigData);
        babo = new Babo(ns, gangConfig);
        ns.tprintf(`INFO Babo loaded gang config ${configAlias} with ${gangConfig.length} entries`);
    }
    else {
        babo = new Babo(ns);
    }
    if (workType !== "") {
        ns.disableLog("sleep");
        ns.disableLog("gang.setMemberTask");
        babo.queueWithType(workType);
        while (true) {
            babo.poll();
            await ns.sleep(1000);
        }
    }
    if (taskName !== "") {
        ns.disableLog("sleep");
        ns.disableLog("gang.setMemberTask");
        if (chaboNames.length > 0) {
            chaboNames.forEach(name => babo.queueTask(new Chabo(ns, name), new Task(ns, taskName)));
        }
        else {
            babo.queueTask(babo.gang.chabos, new Task(ns, taskName));
        }
    }
    if (trainTask !== "") {
        ns.disableLog("sleep");
        ns.disableLog("gang.setMemberTask");
        if (chaboNames.length > 0) {
            chaboNames.forEach(name => babo.queueTask(new Chabo(ns, name), new Task(ns, trainTask)));
        }
        else {
            babo.queueWithType(TaskQueue.Work.Training, new Task(ns, trainTask));
        }
        while (true) {
            babo.poll();
            await ns.sleep(1000);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FuZy5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImdhbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVsQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFbEU7O0dBRUc7QUFDRixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUN4QixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLDBEQUEwRCxDQUFDO1FBQ3pFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSwwQ0FBMEMsQ0FBQztRQUNqRSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsbUJBQW1CLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzNFLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDekUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLHNCQUFzQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsRixDQUFDLE1BQU0s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