import { Scanner } from "server/Scanner";
import { Flags } from "lib/Flags";
import { Zerver } from "server/Zerver";
import { ServerMonitor } from "server/ServerMonitor";
/**
 * Shows some server(s) stats in a logging window
 */
export async function main(ns) {
    ns.disableLog('ALL');
    const flags = new Flags(ns, [
        ["_", "", "Key of field to search in. When no second argument, it will search in evey key."],
        ["_", "", "When given, first argument will be they key and this will be the value to search for (e.g. moneyMax >=1000000; hostname n00dles,foodnstuff)"],
        ["cat", [], `WIll only display servers of a certein category: ${Object.values(Zerver.ServerType).join(", ")}`],
        ["money", [], `Will only display server with a certain money rank: ${Object.values(Zerver.MoneyRank).join(", ")}`],
        ["sort", "", "Will sort by given (e.g. moneyMax) value asc"],
        ["desc", false, "Sort desc"],
        ["help", false, ""]
    ]);
    const args = flags.args();
    const keySearch = args._[0];
    const valueSearch = args._[1];
    const categoies = args["cat"];
    const sortBy = args["sort"];
    const sortDesc = args["desc"];
    const moneyRanks = args["money"];
    const scanner = new Scanner(ns);
    const serverInfos = scanner.scan({ key: keySearch, value: valueSearch }, categoies, moneyRanks, { by: sortBy, desc: sortDesc });
    const monitor = new ServerMonitor(ns, serverInfos.map(s => s.hostname));
    ns.tprintf(`Found ${serverInfos.length} server(s) to monitor`);
    if (serverInfos.length == 0) {
        ns.tprintf(`ERROR No servers to monitor found`);
        return;
    }
    while (true) {
        monitor.monitor();
        await ns.sleep(1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbIm1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJckQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQzlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFO1FBQzlCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxpRkFBaUYsQ0FBQztRQUM1RixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsNklBQTZJLENBQUM7UUFDeEosQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLG9EQUFvRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN4RyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsdURBQXVELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3hILENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSw4Q0FBOEMsQ0FBQztRQUM1RCxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDO1FBQzVCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7S0FDbkIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzVILE1BQU0sT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFeEUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLFdBQVcsQ0FBQyxNQUFNLHVCQUF1QixDQUFDLENBQUM7SUFFL0QsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUN6QixFQUFFLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDaEQsT0FBTztLQUNWO0lBRUQsT0FBTSxJQUFJLEVBQUU7UUFDUixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQyJ9