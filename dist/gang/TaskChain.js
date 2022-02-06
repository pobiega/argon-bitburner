import { StatsMapper } from "/gang/Stats";
import { Task } from '/gang/Task';
export class TaskChain {
    static DefaultWeight = 100;
    tasks = [];
    isTrain;
    weights = [];
    constructor(tasks, isTrain = false) {
        this.tasks = tasks;
        this.isTrain = isTrain;
        this.weights = tasks.map(t => t.total);
    }
    /**
     * @returns training tasks balanced for given tasks
     */
    static trainFromTasks(ns, tasks = [], chabo, progressMulti = 1) {
        if (tasks.length === 0) {
            return undefined;
        }
        const generatedTasks = [];
        let combatWeight = tasks.map(task => +task.stats.strWeight + +task.stats.defWeight + +task.stats.dexWeight + +task.stats.agiWeight)
            .reduce((a, b) => a + b, 0) / tasks.length;
        let hackWeight = tasks.map(task => task.stats.hackWeight)
            .reduce((a, b) => a + b, 0) / tasks.length;
        let chaWeight = tasks.map(task => task.stats.chaWeight)
            .reduce((a, b) => a + b, 0) / tasks.length;
        if (!_.isNumber(combatWeight)) {
            combatWeight = 0;
        }
        if (!_.isNumber(hackWeight)) {
            hackWeight = 0;
        }
        if (!_.isNumber(chaWeight)) {
            chaWeight = 0;
        }
        if (chaWeight > 0 && _.isUndefined(chabo)) {
            generatedTasks.push(new Task(ns, Task.Names.TrainCharisma, 0, chaWeight));
        }
        if (chaWeight > 0 && !_.isUndefined(chabo)) {
            generatedTasks.push(Task.fromAscMulti(ns, Task.Names.TrainCharisma, chabo.info, progressMulti));
        }
        if (hackWeight > 0 && _.isUndefined(chabo)) {
            generatedTasks.push(new Task(ns, Task.Names.TrainHacking, 0, hackWeight));
        }
        else if (hackWeight > 0 && !_.isUndefined(chabo)) {
            generatedTasks.push(Task.fromAscMulti(ns, Task.Names.TrainHacking, chabo.info, progressMulti));
        }
        if (combatWeight > 0 && _.isUndefined(chabo)) {
            generatedTasks.push(new Task(ns, Task.Names.TrainCombat, 0, combatWeight));
        }
        if (combatWeight > 0 && !_.isUndefined(chabo)) {
            generatedTasks.push(Task.fromAscMulti(ns, Task.Names.TrainCombat, chabo.info, progressMulti));
        }
        return new TaskChain(generatedTasks, true);
    }
    static trainFromChabos(ns, chabos, progressMulti = 1) {
        return chabos.map(c => TaskChain.trainFromChabo(ns, c, progressMulti))
            .filter(tc => tc instanceof TaskChain);
    }
    static trainFromChabo(ns, chabo, progressMulti = 1) {
        const tasks = [];
        // Default training for new comers
        if (chabo.isNoob()) {
            tasks.push(new Task(ns, Task.Names.TrainHacking));
            return new TaskChain(tasks);
        }
        const chaboAscMulti = chabo.getAscMultiWeights();
        const combatWeight = chabo.combatMultiWeight;
        const chaboInfo = chabo.info;
        const combatStatsMulti = chabo.combatStatsMulti;
        if (chaboInfo.cha_asc_mult > 1 && chaboAscMulti.chaWeight > 0) {
            tasks.push(Task.fromAscMulti(ns, Task.Names.TrainCharisma, chabo.info, progressMulti));
        }
        if (chaboInfo.hack_asc_mult > 1 && chaboAscMulti.hackWeight > 0) {
            tasks.push(Task.fromAscMulti(ns, Task.Names.TrainHacking, chabo.info, progressMulti));
        }
        if (combatStatsMulti > 1 && combatWeight > 0) {
            tasks.push(Task.fromAscMulti(ns, Task.Names.TrainCombat, chabo.info, progressMulti));
        }
        return new TaskChain(tasks, true);
    }
    static workFromChabo(ns, chabo, progressMulti = 1) {
    }
    static workFromTasks(ns, tasks = [], chabo, progressMulti = 1) {
    }
    get hasTasks() {
        return this.tasks.length > 0;
    }
    isFinished() {
        const finishedTasks = this.tasks
            .map(t => t.isFinished())
            .filter(finished => finished === true);
        return finishedTasks.length === this.tasks.length;
    }
    reset(chabo) {
        this.tasks.forEach(t => t.resetByAscMulti(chabo?.info));
    }
    first() {
        return this.tasks[0];
    }
    getStatsWeight() {
        const taskStats = this.tasks.map(t => t.stats);
        return StatsMapper.mapTaskStatsToStatsWeight(taskStats);
    }
    /**
     * @returns list of stats effected by tasks in chain
     */
    getEffectedStats() {
        const statWeights = this.getStatsWeight();
        return StatsMapper.getEffectedStats(statWeights);
    }
    getFirstNotFinished() {
        const finishedTasks = this.tasks
            .filter(t => !t.isFinished());
        return finishedTasks[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza0NoYWluLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsiZ2FuZy9UYXNrQ2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBZSxNQUFNLGFBQWEsQ0FBQztBQUN2RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBR2xDLE1BQU0sT0FBTyxTQUFTO0lBRWxCLE1BQU0sQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO0lBRTNCLEtBQUssR0FBVyxFQUFFLENBQUE7SUFDbEIsT0FBTyxDQUFVO0lBQ2pCLE9BQU8sR0FBYyxFQUFFLENBQUE7SUFFdkIsWUFBWSxLQUFjLEVBQUUsT0FBTyxHQUFHLEtBQUs7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBTyxFQUFFLFFBQWlCLEVBQUUsRUFBRSxLQUFjLEVBQUUsYUFBYSxHQUFHLENBQUM7UUFDakYsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwQixPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUVELE1BQU0sY0FBYyxHQUFZLEVBQUUsQ0FBQztRQUVuQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUM5SCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDL0MsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ3BELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMvQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDbEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRS9DLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzNCLFlBQVksR0FBRyxDQUFDLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6QixVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDeEIsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNqQjtRQUVELElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzdFO1FBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUNuRztRQUVELElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzdFO2FBQU0sSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoRCxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUNsRztRQUVELElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQzlFO1FBQUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMs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