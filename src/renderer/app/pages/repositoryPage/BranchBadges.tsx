import { makeStyles, Theme } from "@material-ui/core";
import * as React from "react";

import BranchBadge from "renderer/app/pages/repositoryPage/BranchBadge";
import { IRef } from "renderer/app/utils/git/types";

const useStyles = makeStyles<Theme, { color: string }>({
    detachedHead: {
        display: "inline-block",
        height: "0.7em",
        width: "0.7em",
        boxSizing: "border-box",
        border: (props) => `3px solid ${props.color}`,
        borderRadius: "50%",
        marginRight: "0.2em",
    },
});

interface CombinedRef {
    name: string;
    remotes: string[];
    isHead: boolean;
}

const combineRefs: (refs: IRef[]) => CombinedRef[] = (refs) => {
    const combinedRefs: CombinedRef[] = refs
        .filter(({ name, isLocal }) => isLocal && name.length > 0)
        .map(({ name, isHead }) => ({ name, remotes: [], isHead }))
        .sort((ref1, ref2) => (ref1.isHead ? -1 : ref2.isHead ? 1 : 0));

    refs.filter(({ isLocal }) => !isLocal).forEach(({ name }) => {
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

interface BranchBadgesProps {
    refs: IRef[];
    color: string;
}

const BranchBadges: React.FC<BranchBadgesProps> = ({ refs, color }) => {
    const classes = useStyles({ color });

    const combinedRefs = combineRefs(refs);
    const isDetachedHead =
        refs.filter(({ name }) => name.length === 0).length === 1;

    return (
        <>
            {isDetachedHead && (
                <span>
                    <span className={classes.detachedHead} />
                </span>
            )}
            {combinedRefs.map(({ name, remotes, isHead }) => (
                <BranchBadge
                    key={name}
                    name={name}
                    remotes={remotes}
                    isHead={isHead}
                    color={color}
                />
            ))}
        </>
    );
};

export default BranchBadges;
