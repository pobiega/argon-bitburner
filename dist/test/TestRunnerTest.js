import { Assert } from '/test/Assert';
import { TestRunner } from '/test/TestRunner';
/**
 * Tests TestRunner itself
 */
export async function main(ns) {
    const runner = new TestRunner(ns);
    runner.run(TestRunnerTest);
}
const TestRunnerTest = {
    testShouldFail: (ns) => {
        Assert.fail(undefined, undefined, "FAILED");
    },
    testShouldError: (ns) => {
        throw new Error("ERROR");
    },
    testShouldSucceed: (ns) => {
        return;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFJ1bm5lclRlc3QuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJ0ZXN0L1Rlc3RSdW5uZXJUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzlDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTztJQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxNQUFNLGNBQWMsR0FBRztJQUNuQixjQUFjLEVBQUUsQ0FBQyxFQUFPLEVBQVMsRUFBRTtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGVBQWUsRUFBRSxDQUFDLEVBQU8sRUFBUyxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixFQUFFLENBQUMsRUFBTyxFQUFTLEVBQUU7UUFDbkMsT0FBTztJQUNWLENBQUM7Q0FDSixDQUFBIn0=