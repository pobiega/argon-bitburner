import { toPrintableString } from "/lib/utils";
export class Assert {
    static true(value, message = undefined) {
        if (!value)
            this.fail(value, true, message, "==");
    }
    static equal(actual, expected, message = undefined) {
        if (actual != expected)
            this.fail(actual, expected, message, "==");
    }
    static notEqual(actual, expected, message = undefined) {
        if (actual == expected) {
            this.fail(actual, expected, message, "!=");
        }
    }
    static isLength(any, length, message = undefined) {
        if (_.isArray(any) || _.isString(any)) {
            if (any.length !== length)
                this.fail(any, length, message, "length ==");
        }
        else {
            this.fail(`Expected value to be ${Array.name} or ${String.name}, but got ${typeof any}`);
        }
    }
    static empty(any, message = undefined) {
        if (!_.isEmpty(any))
            this.fail(any, 0, message, "length ==");
    }
    static notEmpty(any, message = undefined) {
        if (_.isEmpty(any))
            this.fail(any, 0, message, "length >");
    }
    static isArray(any, message = undefined) {
        if (!_.isArray(any))
            this.fail(typeof any, "array", message, "==");
    }
    static notUndefinedOrNull(any, message = undefined) {
        if (_.isUndefined(any) || _.isNull(any))
            this.fail(any, "<undefined> or <null>", message, "!=");
    }
    static has(object, path, message = undefined) {
        if (!_.has(object, path))
            this.fail(object, `${path.toString()}`, message, "does not have");
    }
    static fail(actual = undefined, expected = undefined, message = undefined, operator = undefined) {
        throw new AssertionError({
            message: message,
            actual: actual,
            expected: expected,
            operator: operator,
        });
    }
}
export class AssertionError extends Error {
    actual;
    expected;
    operator;
    constructor(options) {
        const operator = (!_.isUndefined(options.operator)) ? ` ${options.operator} ` : " to be ";
        const expectedMsg = `Expected: ${toPrintableString(options.actual)}${operator}${toPrintableString(options.expected)}`;
        const msg = (_.isUndefined(options.message)) ? `${expectedMsg}` : `${options.message}\n ${expectedMsg}`;
        super(msg);
        this.actual = options.actual;
        this.expected = options.expected;
        this.operator = operator;
        this.name = "AssertionError";
        Object.setPrototypeOf(this, AssertionError.prototype);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXJ0LmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsidGVzdC9Bc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE1BQU0sT0FBTyxNQUFNO0lBRWYsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFlLEVBQUUsVUFBK0IsU0FBUztRQUNqRSxJQUFJLENBQUMsS0FBSztZQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBZ0IsRUFBRSxRQUFrQixFQUFFLFVBQStCLFNBQVM7UUFDdkYsSUFBSSxNQUFNLElBQUksUUFBUTtZQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBZ0IsRUFBRSxRQUFrQixFQUFFLFVBQStCLFNBQVM7UUFDMUYsSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFhLEVBQUUsTUFBZSxFQUFFLFVBQStCLFNBQVM7UUFDcEYsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsSUFBRyxHQUFHLENBQUMsTUFBTSxLQUFLLE1BQU07Z0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFF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