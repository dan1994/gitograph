import * as React from "react";

import BranchBadge from "renderer/app/pages/repositoryPage/BranchBadge";

const combineRefs: (refs: string[]) => string[] = (refs) => {
    const finalRefs: string[] = [];

    refs.forEach((ref) => {
        if (ref.indexOf("/") === -1) {
            const remotes = refs
                .filter(
                    (otherRef) =>
                        otherRef.endsWith(ref) && otherRef.indexOf("/") !== -1
                )
                .map((otherRef) =>
                    otherRef.substring(0, otherRef.indexOf("/"))
                );
            finalRefs.push(
                `${ref}${remotes.length > 0 ? ` | ${remotes.join(" | ")}` : ""}`
            );
        } else if (
            refs.filter(
                (otherRef) => otherRef === ref.substring(ref.indexOf("/") + 1)
            ).length === 0
        ) {
            finalRefs.push(ref);
        }
    });

    return finalRefs;
};

interface BranchBadgesProps extends React.HTMLProps<HTMLSpanElement> {
    refs: string[];
    color: string;
}

const BranchBadges: React.FC<BranchBadgesProps> = ({ refs, color }) => {
    const combinedRefs = combineRefs(refs);

    return (
        <>
            {combinedRefs.map((ref) => (
                <BranchBadge key={ref} name={ref} color={color} />
            ))}
        </>
    );
};

export default BranchBadges;
