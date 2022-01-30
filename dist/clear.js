import { Zerver } from "server/Zerver";
import { Flags } from "lib/Flags";
/**
 * For deleting everything from a server
 **/
export async function main(ns) {
    const flags = new Flags(ns, [
        ["_", "", `Hostname to delete files from`],
        ["help", false, ""]
    ]);
    const args = flags.args();
    const host = args._[0];
    let servers = Zerver.get(ns);
    if (host != "") {
        servers = servers.filter(server => server.name === host);
    }
    else {
        servers = servers.filter(server => server.name !== "home");
    }
    if (await ns.prompt(`Delete all files on ${servers.length} server(s): ${servers.map(server => server.name)}`)) {
        servers.forEach(server => server.clearFiles());
    }
    ns.tprintf(`Deleted all files on ${servers.length} server(s)`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXIuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJjbGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHbEM7O0lBRUk7QUFDSixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUNyQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsK0JBQStCLENBQUM7UUFDMUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztLQUN0QixDQUFDLENBQUM7SUFDSCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTdCLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtRQUNmLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztLQUN6RDtTQUFNO1FBQ04sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0tBQzNEO0lBRUQsSUFBSSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLE9BQU8sQ0FBQyxNQUFNLGVBQWUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDOUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsT0FBTyxDQUFDLE1BQU0sWUFBWSxDQUFDLENBQUE7QUFDL0QsQ0FBQyJ9