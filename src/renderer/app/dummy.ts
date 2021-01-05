import Commit from "renderer/app/algorithm/Commit";

export const dummyCommits: Commit[] = [
    new Commit("0", 0),
    new Commit("3", 90),
    new Commit("1", 80),
    new Commit("2", 70),
    new Commit("5", 100),
    new Commit("4", 60),
    new Commit("6", 120),
    new Commit("7", 30),
];

dummyCommits[0].children = [
    dummyCommits[2],
    dummyCommits[3],
    dummyCommits[5],
    dummyCommits[6],
    dummyCommits[7],
];

dummyCommits[1].parents = [dummyCommits[3]];
dummyCommits[1].children = [dummyCommits[4]];

dummyCommits[2].parents = [dummyCommits[0]];

dummyCommits[3].parents = [dummyCommits[0]];
dummyCommits[3].children = [dummyCommits[1]];

dummyCommits[4].parents = [dummyCommits[1], dummyCommits[5]];

dummyCommits[5].parents = [dummyCommits[0]];
dummyCommits[5].children = [dummyCommits[4]];

dummyCommits[6].parents = [dummyCommits[0]];

dummyCommits[7].parents = [dummyCommits[0]];
