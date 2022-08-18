import { Zerver } from '/server/Zerver';
/**
 * Solves Coding Contracts
 *
 * Mostly copied from https://gist.github.com/OrangeDrangon/8a08d2d7d425fddd2558e1c0c5fae78b
 * and https://steamcommunity.com/sharedfiles/filedetails/?id=2712741294/, because I'm stupid and lazy...
 *
 * Kudos to: https://github.com/OrangeDrangon and zc https://steamcommunity.com/profiles/76561198062278367
 */
export class Contractor {
    ns;
    constructor(ns) {
        this.ns = ns;
    }
    findServers() {
        return Zerver.get(this.ns).filter(s => s.hasContract);
    }
    /**
     * Find and solve Coding Contracts
     *
     * @param dry will only print results instead of solving
     */
    solveAll(dry = false) {
        const servers = this.findServers();
        for (const server of servers) {
            server.contracts.forEach(contractFile => {
                const name = this.ns.codingcontract.getContractType(contractFile, server.name);
                const data = this.ns.codingcontract.getData(contractFile, server.name);
                const solved = this.solve(name, data, server.name, contractFile, dry);
                let variant;
                let logLevel;
                let msg = `${server.name} ${contractFile} - ${name}`;
                if (typeof solved === "undefined") {
                    variant = "info";
                    logLevel = "INFO";
                    msg = msg + " SKIPPED";
                }
                else if (solved) {
                    variant = "success";
                    logLevel = "INFO";
                    msg = msg + ` - ${solved}`;
                }
                else {
                    variant = "error";
                    logLevel = "ERROR";
                    msg = msg + " FAILED...";
                }
                this.ns.toast(msg, variant);
                this.ns.tprint(`${logLevel} ${msg}`);
                this.ns.print(`${logLevel} ${msg}\npath: ${server.path}`);
            });
        }
    }
    /**
     * Solve a specific Coding Contract
     */
    solve(name, data, host, contractFile, dry = false) {
        let result;
        switch (name) {
            case "Algorithmic Stock Trader I":
                result = this.stockTraderI(data);
                break;
            case "Algorithmic Stock Trader II":
                result = this.stockTraderII(data);
                break;
            case "Algorithmic Stock Trader III":
                result = this.stockTraderIII(data);
                break;
            case "Algorithmic Stock Trader IV":
                result = this.stockTraderIV(data);
                break;
            case "Minimum Path Sum in a Triangle":
                result = this.solveTriangleSum(data);
                break;
            case "Unique Paths in a Grid I":
                result = this.uniquePathsI(data);
                break;
            case "Unique Paths in a Grid II":
                result = this.uniquePathsII(data);
                break;
            case "Generate IP Addresses":
                result = this.generateIps(data);
                break;
            case "Find Largest Prime Factor":
                result = this.factor(data);
                break;
            case "Spiralize Matrix":
                result = this.spiral(data);
                break;
            case "Merge Overlapping Intervals":
                result = this.mergeOverlap(data);
                break;
            case "Total Ways to Sum":
                result = this.totalWayToSum(data);
                break;
            case "Find All Valid Math Expressions":
                result = this.findAllValidMathExpr(data);
                break;
            case "Subarray with Maximum Sum":
                result = this.findMaxSubArraySum(data);
                break;
            case "Array Jumping Game":
                result = this.findJump(data, 0);
                break;
            case "Sanitize Parentheses in Expression":
                result = this.sanitizeParentheses(data);
                break;
            default:
                break;
        }
        if (typeof result === "undefined") {
            return undefined;
        }
        if (dry) {
            this.ns.tprint(`Dry run ${name} - ${contractFile} result: ${result}`);
            return true;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore result can be number[]
        return this.ns.codingcontract.attempt(result, contractFile, host, { returnReward: true });
    }
    /**
     * Minimum Path Sum in a Triangle
     */
    solveTriangleSum(arrayData) {
        const triangle = arrayData;
        let nextArray = [];
        let previousArray = triangle[0];
        for (let i = 1; i < triangle.length; i++) {
            nextArray = [];
            for (let j = 0; j < triangle[i].length; j++) {
                if (j == 0) {
                    nextArray.push(previousArray[j] + triangle[i][j]);
                }
                else if (j == triangle[i].length - 1) {
                    nextArray.push(previousArray[j - 1] + triangle[i][j]);
                }
                else {
                    nextArray.push(Math.min(previousArray[j], previousArray[j - 1]) + triangle[i][j]);
                }
            }
            previousArray = nextArray;
        }
        return Math.min.apply(null, nextArray);
    }
    /**
     * Unique Paths in a Grid II
     */
    uniquePathsII(grid, ignoreFirst = false, ignoreLast = false) {
        const rightMoves = grid[0].length - 1;
        const downMoves = grid.length - 1;
        let totalPossiblePaths = Math.round(this.factorialDivision(rightMoves + downMoves, rightMoves) / (this.factorial(downMoves)));
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == 1 && (!ignoreFirst || (i != 0 || j != 0)) && (!ignoreLast || (i != grid.length - 1 || j != grid[i].length - 1))) {
                    const newArray = [];
                    for (let k = i; k < grid.length; k++) {
                        newArray.push(grid[k].slice(j, grid[i].length));
                    }
                    let removedPaths = this.uniquePathsII(newArray, true, ignoreLast);
                    removedPaths *= this.uniquePathsI([i + 1, j + 1]);
                    totalPossiblePaths -= removedPaths;
                }
            }
        }
        return totalPossiblePaths;
    }
    /**
     * Unique Paths in a Grid I
     */
    uniquePathsI(grid) {
        const rightMoves = grid[0] - 1;
        const downMoves = grid[1] - 1;
        return Math.round(this.factorialDivision(rightMoves + downMoves, rightMoves) / (this.factorial(downMoves)));
    }
    factorial(n) {
        return this.factorialDivision(n, 1);
    }
    factorialDivision(n, d) {
        if (n == 0 || n == 1 || n == d)
            return 1;
        return this.factorialDivision(n - 1, d) * n;
    }
    /**
     * Generate IP Addresses
     */
    generateIps(num) {
        const numStr = num.toString();
        const length = numStr.length;
        const ips = [];
        for (let i = 1; i < length - 2; i++) {
            for (let j = i + 1; j < length - 1; j++) {
                for (let k = j + 1; k < length; k++) {
                    const ip = [
                        numStr.slice(0, i),
                        numStr.slice(i, j),
                        numStr.slice(j, k),
                        numStr.slice(k, numStr.length)
                    ];
                    let isValid = true;
                    ip.forEach((seg, i) => {
                        isValid = isValid && this.isValidIpSegment(seg, i);
                    });
                    if (isValid)
                        ips.push(ip.join("."));
                }
            }
        }
        return ips;
    }
    isValidIpSegment(segment, idx) {
        if (idx === 0 && typeof segment === "string" && segment === "0")
            return false;
        if (idx === 0 && typeof segment === "number" && segment === 0)
            return false;
        if ((Array.isArray(segment) && segment[0] === "0"))
            return false;
        segment = Number(segment);
        if (segment < 0 || segment > 255)
            return false;
        return true;
    }
    /**
     * Algorithmic Stock Trader I
     */
    stockTraderI(data) {
        const transactionsMax = 1;
        const prices = data;
        const days = prices.length;
        return this.maxProfit(prices, days, transactionsMax);
    }
    /**
     * Algorithmic Stock Trader II
     */
    stockTraderII(data) {
        const transactionsMax = Math.ceil(data.length / 2);
        const prices = data;
        const days = prices.length;
        return this.maxProfit(prices, days, transactionsMax);
    }
    /**
     * Algorithmic Stock Trader III
     */
    stockTraderIII(data) {
        const transactionsMax = 2;
        const prices = data;
        const days = prices.length;
        return this.maxProfit(prices, days, transactionsMax);
    }
    /**
     * Algorithmic Stock Trader IV
     */
    stockTraderIV(data) {
        const transactionsMax = data[0];
        const prices = data[1];
        const days = prices.length;
        return this.maxProfit(prices, days, transactionsMax);
    }
    maxProfit(prices, days, transMax) {
        const profit = Array(transMax + 1).fill(0)
            .map(x => {
            const dayArr = Array(days + 1).fill(0);
            return dayArr;
        });
        for (let i = 0; i <= transMax; i++)
            profit[i][0] = 0;
        for (let j = 0; j <= days; j++)
            profit[0][j] = 0;
        for (let i = 1; i <= transMax; i++) {
            for (let j = 1; j < days; j++) {
                let max_so_far = 0;
                for (let m = 0; m < j; m++)
                    max_so_far = Math.max(max_so_far, prices[j] - prices[m] + profit[i - 1][m]);
                profit[i][j] = Math.max(profit[i][j - 1], max_so_far);
            }
        }
        const result = profit[transMax][days - 1];
        return result;
    }
    /**
     * Find Largest Prime Factor
     */
    factor(num) {
        for (let div = 2; div <= Math.sqrt(num); div++) {
            if (num % div != 0) {
                continue;
            }
            num = num / div;
            div = 2;
        }
        return num;
    }
    /**
     * Spiralize Matrix
     */
    spiral(arr, accum = []) {
        if (arr.length === 0 || arr[0].length === 0) {
            return accum;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore this is fine :)
        accum = accum.concat(arr.shift());
        if (arr.length === 0 || arr[0].length === 0) {
            return accum;
        }
        accum = accum.concat(...this.column(arr, arr[0].length - 1));
        if (arr.length === 0 || arr[0].length === 0) {
            return accum;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore this is fine :)
        accum = accum.concat(...arr.pop().reverse());
        if (arr.length === 0 || arr[0].length === 0) {
            return accum;
        }
        accum = accum.concat(...this.column(arr, 0).reverse());
        if (arr.length === 0 || arr[0].length === 0) {
            return accum;
        }
        return this.spiral(arr, accum);
    }
    column(arr, index) {
        const res = [];
        for (let i = 0; i < arr.length; i++) {
            const elm = arr[i].splice(index, 1)[0];
            if (elm) {
                res.push(elm);
            }
        }
        return res;
    }
    /**
     * Merge Overlapping Intervals
     */
    mergeOverlap(intervals) {
        intervals.sort(([minA], [minB]) => minA - minB);
        for (let i = 0; i < intervals.length; i++) {
            for (let j = i + 1; j < intervals.length; j++) {
                const [min, max] = intervals[i];
                const [laterMin, laterMax] = intervals[j];
                if (laterMin <= max) {
                    const newMax = laterMax > max ? laterMax : max;
                    const newInterval = [min, newMax];
                    intervals[i] = newInterval;
                    intervals.splice(j, 1);
                    j = i;
                }
            }
        }
        return intervals;
    }
    /**
     * Total Ways to Sum
     */
    totalWayToSum(data) {
        const cache = {};
        const n = data;
        const result = this.twts(n, n, cache);
        return result - 1;
    }
    twts(limit, n, cache = {}) {
        if (n < 1) {
            return 1;
        }
        if (limit == 1) {
            return 1;
        }
        if (n < limit) {
            return this.twts(n, n, cache = {});
        }
        if (n in cache) {
            const c = cache[n];
            if (limit in c) {
                return c[limit];
            }
        }
        let s = 0;
        for (let i = 1; i <= limit; i++) {
            s += this.twts(i, n - i, cache);
        }
        if (!(n in cache)) {
            cache[n] = {};
        }
        cache[n][limit] = s;
        return s;
    }
    /**
     * Find All Valid Math Expressions
     */
    findAllValidMathExpr(data) {
        const s = data[0];
        const n = data[1];
        return this.findExpr(s, n, "");
    }
    findExpr(s, n, expr) {
        if (s.length == 0) {
            if (eval(expr) == n) {
                return [expr];
            }
            else {
                return [];
            }
        }
        let results = [];
        if (s.startsWith("0")) {
            const sliced = s.slice(1);
            if (expr.length == 0) {
                return this.findExpr(sliced, n, expr + "0");
            }
            results = results.concat(this.findExpr(sliced, n, expr + "+0"), this.findExpr(sliced, n, expr + "-0"), this.findExpr(sliced, n, expr + "*0"));
            return results;
        }
        const maxLength = s.length;
        let ops = [];
        if (expr.length == 0) {
            ops = ["", "-"];
        }
        else {
            ops = ["-", "+", "*"];
        }
        for (const op of ops) {
            for (let i = 1; i <= maxLength; i++) {
                results = results.concat(this.findExpr(s.slice(i), n, expr + op + s.slice(0, i)));
            }
        }
        return results;
    }
    /**
     * Subarray with Maximum Sum
     */
    findMaxSubArraySum(arr) {
        if (arr.length == 0) {
            return 0;
        }
        if (arr.length == 1) {
            return arr[0];
        }
        let sum = this.findMaxSubArraySum(arr.slice(1));
        let s = 0;
        for (let i = 0; i < arr.length; i++) {
            s += arr[i];
            if (s > sum) {
                sum = s;
            }
        }
        return sum;
    }
    /**
     * Array Jumping Game
     */
    findJump(data, pos) {
        const maxJump = data[pos];
        if (pos + maxJump >= data.length - 1) {
            return 1;
        }
        for (let i = 1; i <= maxJump; i++) {
            if (this.findJump(data, pos + i) == 1) {
                return 1;
            }
        }
        return 0;
    }
    /**
     * Sanitize Parentheses in Expression
     */
    sanitizeParentheses(data) {
        const context = { "maxLeftLength": 0 };
        let exprs = this.findSanitized(data, 0, context);
        exprs = exprs.filter(e => e.length >= context["maxLeftLength"]).sort();
        for (let i = 0; i < exprs.length - 1; i++) {
            while (exprs[i] == exprs[i + 1]) {
                exprs.splice(i + 1, 1);
            }
        }
        return exprs;
    }
    findSanitized(s, pos, context) {
        if (s.length < context["maxLeftLength"]) {
            return [];
        }
        if (pos == s.length) {
            if (this.validateParentheses(s)) {
                if (s.length > context["maxLeftLength"]) {
                    context["maxLeftLength"] = s.length;
                }
                return [s];
            }
            else {
                return [];
            }
        }
        let results = [];
        const c = s[pos];
        if (c == "(" || c == ")") {
            results = results.concat(this.findSanitized(s, pos + 1, context), this.findSanitized(s.slice(0, pos) + s.slice(pos + 1), pos, context));
        }
        else {
            results = results.concat(this.findSanitized(s, pos + 1, context));
        }
        return results;
    }
    validateParentheses(s) {
        let n = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] == "(") {
                n++;
            }
            if (s[i] == ")") {
                n--;
            }
            if (n < 0) {
                return false;
            }
        }
        return n == 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3Rvci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImNvbnRyYWN0L0NvbnRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXhDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8sVUFBVTtJQUNuQixFQUFFLENBQUk7SUFFTixZQUFZLEVBQU07UUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLEdBQUcsR0FBRyxLQUFLO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQyxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9FLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFD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Q0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUVyQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMvSCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFD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