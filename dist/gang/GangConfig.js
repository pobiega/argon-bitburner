import { Chabo, NameGenerator } from '/gang/Chabo';
import { Task } from '/gang/Task';
import { toPrintableString } from '/lib/utils';
export class GangConfig {
    config;
    constructor(config = []) {
        this.config = config;
    }
    static fromObjectArray(config = []) {
        return new GangConfig(config);
    }
    static fromFile(ns, path) {
        const config = GangConfigGenerator.read(ns, path);
        return new GangConfig(config);
    }
    static fromStringArray(ns, config) {
        const configObjects = config.map((value, i, entry) => {
            const chaboNames = entry[0];
            const taskNames = entry[1];
            if (!Array.isArray(chaboNames) || !Array.isArray(chaboNames)) {
                console.warn("Illegal chabo config", chaboNames, taskNames);
                throw new Error(`Illegal chabo config`);
            }
            const chabos = chaboNames.map(name => new Chabo(ns, name));
            const tasks = taskNames.map(name => new Task(ns, name));
            return { chabos: chabos, tasks: tasks };
        });
        if (typeof configObjects === "undefined") {
            return new GangConfig();
        }
        return GangConfig.fromObjectArray(configObjects);
    }
    static fromGenerator(ns, hack = 0, combat = 0) {
        const config = GangConfigGenerator.generateGangConfig(ns, hack, combat);
        return GangConfig.fromObjectArray(config);
    }
    getAllChabos() {
        const chabos = this.config.flatMap(c => c.chabos);
        return _.uniqBy(chabos, c => c.name);
    }
}
export class GangConfigGenerator {
    static MaximumGangMembers = 12;
    static generateGangConfig(ns, hack = 0, combat = 0) {
        const total = hack + combat;
        if (total > GangConfigGenerator.MaximumGangMembers) {
            throw new Error(`Only ${GangConfigGenerator.MaximumGangMembers} members total are allowed got ${total}`);
        }
        let names = NameGenerator.generateMultiple([], total);
        const config = [];
        for (let i = 0; i <= hack; i++) {
            config.push({
                chabos: [new Chabo(ns, names[i])],
                tasks: [new Task(ns, Task.Names.Ransomware)]
            });
        }
        names = names.slice(hack - 1);
        for (let i = 0; i <= combat; i++) {
            config.push({
                chabos: [new Chabo(ns, names[i])],
                tasks: [new Task(ns, Task.Names.Mug)]
            });
        }
        return config;
    }
    static async write(ns, config, path) {
        const simpleData = GangConfigGenerator.toSimple(config);
        const data = toPrintableString(simpleData);
        await ns.write(path, data, "w");
    }
    static read(ns, path) {
        const simpleData = ns.read(path);
        const simpleParsed = JSON.parse(simpleData);
        const data = GangConfigGenerator.fromSimple(ns, simpleParsed);
        if (!_.isArray(data))
            return [];
        return data;
    }
    static toSimple(configs) {
        const configSimple = [];
        for (const config of configs) {
            configSimple.push({
                chabos: config.chabos.map(c => c.name),
                tasks: config.tasks.map(t => t.name)
            });
        }
        return configSimple;
    }
    static fromSimple(ns, configSimple) {
        const configs = [];
        for (const config of configSimple) {
            configs.push({
                chabos: config.chabos.map(name => new Chabo(ns, name)),
                tasks: config.tasks.map(name => new Task(ns, name))
            });
        }
        return configs;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FuZ0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImdhbmcvR2FuZ0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQVkvQyxNQUFNLE9BQU8sVUFBVTtJQUNuQixNQUFNLENBQWU7SUFFckIsWUFBWSxTQUF5QixFQUFFO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQXlCLEVBQUU7UUFDOUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFPLEVBQUUsSUFBYTtRQUNsQyxNQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBTyxFQUFFLE1BQTZCO1FBQ3pELE1BQU0sYUFBYSxHQUFtQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqRSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FB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