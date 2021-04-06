import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import { RelayMessage } from "../../lib/models";

use(sinonChai);

describe("# RelayMessage", () => {
    it("can be created", () => {
        expect(new RelayMessage()).to.not.be.null;
    });

    it("sets and gets string payload", async () => {
        const testMessage = new RelayMessage();
        await testMessage.setPayload("test")
        const testPayload = await testMessage.getPayload();
        expect(testPayload).to.equal("test");
    });
});