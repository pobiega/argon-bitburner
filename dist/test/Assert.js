import { toPrintableType } from "/lib/utils";
/**
 * Used for assertins in tests.
 * An AssertionError will mark a test as failed.
 */
export class Assert {
    static true(value, message) {
        if (!value)
            this.fail(value, true, message, "==");
    }
    static equal(actual, expected, message) {
        if (actual != expected)
            this.fail(actual, expected, message, "==");
    }
    static notEqual(actual, expected, message) {
        if (actual == expected) {
            this.fail(actual, expected, message, "!=");
        }
    }
    static isLength(any, length, message) {
        if (_.isArray(any) || _.isString(any)) {
            if (any.length !== length)
                this.fail(any, length, message, "length ==");
        }
        else {
            this.fail(typeof any, `${Array.name} or ${String.name}`, undefined, "is");
        }
    }
    static empty(any, message) {
        if (!_.isEmpty(any))
            this.fail(any, 0, message, "length ==");
    }
    static notEmpty(any, message) {
        if (_.isEmpty(any))
            this.fail(any, 0, message, "length >");
    }
    static isArray(any, message) {
        if (!_.isArray(any))
            this.fail(typeof any, "array", message, "==");
    }
    static notUndefinedOrNull(any, message) {
        if (_.isUndefined(any) || _.isNull(any))
            this.fail(any, "<undefined> or <null>", message, "!=");
    }
    static has(object, path, message) {
        if (!_.has(object, path))
            this.fail(object, `${path.toString()}`, message, "does not have");
    }
    static fail(actual, expected, message, operator) {
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
        const expectedMsg = `↯ Expected: ${toPrintableType(options.actual)}${operator}${toPrintableType(options.expected)}`;
        const msg = (_.isUndefined(options.message)) ? `${expectedMsg}` : `${options.message}\n${expectedMsg}`;
        super(msg);
        this.actual = options.actual;
        this.expected = options.expected;
        this.operator = operator;
        this.name = "AssertionError";
        Object.setPrototypeOf(this, AssertionError.prototype);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXJ0LmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsidGVzdC9Bc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3Qzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sTUFBTTtJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBZSxFQUFFLE9BQWlCO1FBQzFDLElBQUksQ0FBQyxLQUFLO1lBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFnQixFQUFFLFFBQWtCLEVBQUUsT0FBaUI7UUFDaEUsSUFBSSxNQUFNLElBQUksUUFBUTtZQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBZ0IsRUFBRSxRQUFrQixFQUFFLE9BQWlCO1FBQ25FLElBQUksTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBYSxFQUFFLE1BQWUsRUFBRSxPQUFpQjtRQUM3RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFHLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTTtnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFF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