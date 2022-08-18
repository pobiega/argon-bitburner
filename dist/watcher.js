export async function main(ns) {
    const hashes = {};
    const files = ns.ls('home', '.js');
    for (const file of files) {
        const contents = ns.read(file);
        if (!_.isString(contents))
            continue;
        hashes[file] = getHash(contents);
    }
    while (true) {
        const files = ns.ls('home', '.js');
        for (const file of files) {
            const contents = ns.read(file);
            if (!_.isString(contents))
                continue;
            const hash = getHash(contents);
            if (hash != hashes[file]) {
                ns.tprintf(`INFO: Detected change in ${file}`);
                const processes = ns.ps().filter((p) => {
                    return p.filename == file;
                });
                for (const process of processes) {
                    ns.tprintf(`INFO: Restarting ${process.filename} ${process.args} -t ${process.threads}`);
                    if (process.filename != ns.getScriptName()) {
                        ns.kill(process.pid);
                        ns.run(process.filename, process.threads, ...process.args);
                    }
                    else {
                        ns.spawn(process.filename, process.threads, ...process.args);
                    }
                }
                hashes[file] = hash;
            }
        }
        await ns.sleep(1000);
    }
}
const getHash = (input) => {
    let hash = 0, i, chr;
    if (input.length === 0)
        return hash;
    for (i = 0; i < input.length; i++) {
        chr = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbIndhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUM3QixNQUFNLE1BQU0sR0FBMkIsRUFBRSxDQUFBO0lBRXpDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2xDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1FBQ3RCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFOUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQUUsU0FBUztRQUVwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ25DO0lBRUQsT0FBTyxJQUFJLEVBQUU7UUFDVCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUVsQyxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN0QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzlCLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFBRSxTQUFTO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUU5QixJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLEVBQUUsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFDLENBQUE7Z0JBRTlDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFjLEVBQUUsRUFBRTtvQkFDaEQsT0FBTyxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQTtnQkFDN0IsQ0FBQyxDQUFDLENBQUE7Z0JBRUYsS0FBSyxNQUFNLE9BQU8sSUFBSSxTQUFTLEVBQUU7b0JBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtvQkFDeEYsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsRUFBRTt3QkFDeEMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7d0JBQ3BCLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO3FCQUM3RDt5QkFBTTt3QkFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtxQkFDL0Q7aUJBQ0o7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTthQUN0QjtTQUNKO1FBRUQsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3ZCO0FBQ0wsQ0FBQztBQUVELE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBYSxFQUFVLEVBQUU7SUFDdEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUE7SUFDcEIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQTtJQUNuQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0IsR0FBRyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekIsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFBO1FBQ2pDLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQywyQkFBMkI7S0FDeEM7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9