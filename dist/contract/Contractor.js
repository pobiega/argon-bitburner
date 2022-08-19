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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
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
            case "Encryption I: Caesar Cipher":
                result = this.encryption1(data);
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
    generateIps(data) {
        if (typeof data !== "string")
            throw new Error("solver expected string");
        const ret = [];
        for (let a = 1; a <= 3; ++a) {
            for (let b = 1; b <= 3; ++b) {
                for (let c = 1; c <= 3; ++c) {
                    for (let d = 1; d <= 3; ++d) {
                        if (a + b + c + d === data.length) {
                            const A = parseInt(data.substring(0, a), 10);
                            const B = parseInt(data.substring(a, a + b), 10);
                            const C = parseInt(data.substring(a + b, a + b + c), 10);
                            const D = parseInt(data.substring(a + b + c, a + b + c + d), 10);
                            if (A <= 255 && B <= 255 && C <= 255 && D <= 255) {
                                const ip = [A.toString(), ".", B.toString(), ".", C.toString(), ".", D.toString()].join("");
                                if (ip.length === data.length + 3) {
                                    ret.push(ip);
                                }
                            }
                        }
                    }
                }
            }
        }
        return ret;
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
    encryption1(data) {
        const cipher = [...data[0]]
            .map((a) => (a === " " ? a : String.fromCharCode(((a.charCodeAt(0) - 65 - data[1] + 26) % 26) + 65)))
            .join("");
        return cipher;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3Rvci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbImNvbnRyYWN0L0NvbnRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXhDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8sVUFBVTtJQUNuQixFQUFFLENBQUk7SUFFTixZQUFZLEVBQU07UUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLEdBQUcsR0FBRyxLQUFLO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQyxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9FLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFD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