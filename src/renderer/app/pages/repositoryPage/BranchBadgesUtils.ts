import { IRef } from "renderer/app/utils/git/types";
import { Refs } from "renderer/app/utils/git";

export interface ICombinedRef {
    name: string;
    remotes: string[];
    isHead: boolean;
}

export const combineRefs: (refs: IRef[]) => ICombinedRef[] = (refs) => {
    const combinedRefs: ICombinedRef[] = refs
        .filter(isLocalRef)
        .map(toCombinedRef)
        .sort(headFirstSort);

    refs.filter((ref) => !Refs.isLocal(ref)).forEach(({ name }) => {
        const matchingLocalRef = combinedRefs.filter(
            ({ name: localName }) =>
                name.substring(name.indexOf("/") + 1) === localName
        )[0];

        if (matchingLocalRef) {
            matchingLocalRef.remotes.push(name.substring(0, name.indexOf("/")));
        } else {
            combinedRefs.push({ name, remotes: [], isHead: false });
        }
    });

    return combinedRefs;
};

const isLocalRef: (ref: IRef) => boolean = (ref) =>
    Refs.isLocal(ref) && ref.name.length > 0;

const toCombinedRef: (ref: IRef) => ICombinedRef = ({ name, isHead }) => ({
    name,
    remotes: [],
    isHead,
});

const headFirstSort: (ref1: ICombinedRef, ref2: ICombinedRef) => number = (
    ref1,
    ref2
) => (ref1.isHead ? -1 : ref2.isHead ? 1 : 0);
