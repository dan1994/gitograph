import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";

import { IRef } from "renderer/app/utils/git/types";
import BranchBadge from "renderer/app/pages/repositoryPage/BranchBadge";
import { combineRefs } from "renderer/app/pages/repositoryPage/BranchBadgesUtils";

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
            {combinedRefs.map((ref) => (
                <BranchBadge key={ref.name} reference={ref} color={color} />
            ))}
        </>
    );
};

export default BranchBadges;
