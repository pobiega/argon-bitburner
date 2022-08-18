import { StatsUI, UIModel } from "ui/StatsUI";
import { NumberStack } from "lib/utils";
import { Flags } from "/lib/Flags";
export async function main(ns) {
    const flags = new Flags(ns, [
        ["help", false, "For displaying some information in the right hand site overview panel"]
    ]);
    flags.args();
    ns.disableLog("ALL");
    const moneyBuffer = new NumberStack([], 60);
    const strExpBuffer = new NumberStack([], 60);
    const defExpBuffer = new NumberStack([], 60);
    const dexExpBuffer = new NumberStack([], 60);
    const agiExpBuffer = new NumberStack([], 60);
    const chrExpBuffer = new NumberStack([], 60);
    const repBuffer = new NumberStack([], 60);
    const ui = new StatsUI(12, 22);
    while (true) {
        const pServers = ns.getPurchasedServers();
        const pServerTotalRamMax = pServers.map(server => ns.getServerMaxRam(server)).reduce((a, b) => a + b, 0);
        const pServerTotalRamUsed = pServers.map(server => ns.getServerUsedRam(server)).reduce((a, b) => a + b, 0);
        const hServerRamMax = ns.getServerMaxRam("home");
        const hServerRamUsed = ns.getServerUsedRam("home");
        const moneyCurr = ns.getServerMoneyAvailable("home");
        const player = ns.getPlayer();
        const strExp = player.exp.strength;
        const defExp = player.exp.defense;
        const dexExp = player.exp.dexterity;
        const agiExp = player.exp.agility;
        const chrExp = player.exp.charisma;
        // const repGained = ns.getPlayer().workRepGained;
        moneyBuffer.push(moneyCurr);
        // repBuffer.push(repGained);
        // todo only show stat exp when it is actualy not 0 
        strExpBuffer.push(strExp);
        defExpBuffer.push(defExp);
        dexExpBuffer.push(dexExp);
        agiExpBuffer.push(agiExp);
        chrExpBuffer.push(chrExp);
        ui.update(new UIModel(
        // repBuffer.avgIncrement(),
        0, moneyBuffer.diff(), ns.getTotalScriptIncome()[0], ns.getTotalScriptExpGain(), strExpBuffer.avgIncrement(), defExpBuffer.avgIncrement(), dexExpBuffer.avgIncrement(), agiExpBuffer.avgIncrement(), chrExpBuffer.avgIncrement(), pServerTotalRamUsed, pServerTotalRamMax, hServerRamUsed, hServerRamMax));
        await ns.sleep(1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJzdGF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHbkMsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTztJQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUU7UUFDM0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLHVFQUF1RSxDQUFDO0tBQ3hGLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckIsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QyxNQUFNLFlBQVksR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sWUFBWSxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QyxNQUFNLFlBQVksR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lB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