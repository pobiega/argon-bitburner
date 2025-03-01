import { Flags } from "lib/Flags";
import { asFormat, asFormatGB, fromFormatGB } from "lib/utils";
import { Purchaser } from "server/Purchaser";
/**
 * For purchasing or upgrading servers
 */
export async function main(ns) {
    const flags = new Flags(ns, [
        ["_", "8gb", "Amount of ram in GB to purchase"],
        ["max", false, "When given, the max possible amount of servers will be bought"],
        ["scale", 1, "Defines the percent between 0 and 1 to buy max possible amount of servers with"],
        ["multi", 2, "Multiplikator for next possible ram upgrade"],
        ["help", false, "For purchasing private servsers"]
    ]);
    const args = flags.args();
    let ram = args._[0];
    const scale = args["scale"];
    const multi = args["multi"];
    const doMax = args["max"];
    const purchaser = new Purchaser(ns, scale, multi);
    if (doMax) {
        ram = purchaser.getRamMaxUpgrade();
    }
    else {
        ram = fromFormatGB(ram);
    }
    if (Number.isNaN(ram)) {
        throw "Invalid ram given";
    }
    ns.tprintf(`There are ${purchaser.getFreeSlots()} free server slots`);
    ns.tprintf(`Upgrade possible: ${purchaser.canUpgradeServers()}`);
    const maxPossible = purchaser.getRamMaxUpgrade();
    const currentMin = purchaser.getRamMin();
    if (!purchaser.canUpgradeServers() || currentMin === maxPossible) {
        // don't ask the player to upgrade when they can't
        ns.tprintf(`Current servers are [min: ${asFormatGB(currentMin)}|max: ${asFormatGB(purchaser.getRamMax())}]`);
        return;
    }
    ns.tprintf(`Possible next upgrade could be from [min: ${asFormatGB(currentMin)}|max: ${asFormatGB(purchaser.getRamMax())}] to ${asFormatGB(maxPossible)} for ${asFormat(purchaser.getUpgradeCosts())}`);
    const prompt = await ns.prompt(`Upgrading to ${doMax ? "MAX " : ""} ${asFormatGB(ram)} will cost you ${asFormat(purchaser.getCostTotal(ram))}`);
    if (!prompt) {
        return;
    }
    purchaser.buyOrUpgradeServers(ram);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyY2hhc2UuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJwdXJjaGFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFJN0M7O0dBRUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQ2hDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUMzQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsaUNBQWlDLENBQUM7UUFDL0MsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLCtEQUErRCxDQUFDO1FBQy9FLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxnRkFBZ0YsQ0FBQztRQUM5RixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsNkNBQTZDLENBQUM7UUFDM0QsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLGlDQUFpQyxDQUFDO0tBQ2xELENBQUMsQ0FBQztJQUNILE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUUxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTFCLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFbEQsSUFBSSxLQUFLLEVBQUU7UUFDVixHQUFHLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDbkM7U0FBTTtRQUNOLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEI7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdEIsTUFBTSxtQkFBbUIsQ0FBQztLQUMxQjtJQUVELEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxTQUFTLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDdEUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRWhFLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLElBQUksVUFBVSxLQUFLLFdBQVcsRUFBRTtRQUNqRSxrREFBa0Q7UUFDbEQsRUFBRSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0csT0FBTztLQUNQO0lBRUQsRUFBRSxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV4TSxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFaEosSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNaLE9BQU87S0FDUDtJQUVELFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQyxDQUFDIn0=