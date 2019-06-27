
const FakeIdGenerator = function () {
    this.fakeId = -10000;
    return () => this.fakeId--;
}

export const getFakeContainerId = new FakeIdGenerator();

export const getFakeDetailId = new FakeIdGenerator();
