
const FakeIdGenerator = function () {
    this.fakeId = -1;
    return () => this.fakeId--;
}

export const getFakeContainerId = new FakeIdGenerator();

export const getFakeDetailId = new FakeIdGenerator();
