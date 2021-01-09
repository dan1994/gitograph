export const objMap: <From, To>(
    original: { [key: string]: From },
    mapFunction: (key: string, value: From) => To
) => { [key: string]: To } = (original, mapFunction) => {
    return Object.entries(original).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: mapFunction(key, value),
        }),
        {}
    );
};
