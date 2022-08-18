import { Cracker } from "dist/Cracker";
/**
 * Able to buy cracks and tor
 */
export class AdvCracker extends Cracker {
    /**
     * @param {NS} ns
     */
    constructor(ns) {
        super(ns);
    }
    buyCracks() {
        const missingCracks = super.getMissingCracks();
        try {
            missingCracks.forEach(prog => {
                if (this.ns.singularity.purchaseProgram(prog))
                    this.ns.toast("Bought new crack: " + prog, "info", 5000);
            });
        }
        catch (err) {
            this.ns.print("Could not buy any crack: " + err);
        }
        return super.getAvailCracks();
    }
    buyTor() {
        try {
            if (this.ns.singularity.purchaseTor()) {
                this.ns.toast("Bought TOR router", "info", 5000);
                return true;
            }
        }
        catch (err) {
            // ignore
        }
        this.ns.print("Could not buy TOR router");
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWR2Q3JhY2tlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImRpc3QvQWR2Q3JhY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR3ZDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVcsU0FBUSxPQUFPO0lBRW5DOztPQUVHO0lBQ0gsWUFBWSxFQUFPO1FBQ2YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVELFNBQVM7UUFDTCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUUvQyxJQUFJO1lBQ0EsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixHQUFHLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUcsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxPQUFPLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUk7WUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUFDLE9BQU0sR0FBRyxFQUFFO1lBQ1QsU0FBUztTQUNaO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUMxQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0oifQ==