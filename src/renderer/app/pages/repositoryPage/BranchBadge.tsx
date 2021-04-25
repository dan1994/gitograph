import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { ITheme } from "renderer/app/global";
import { ICombinedRef } from "renderer/app/pages/repositoryPage/BranchBadgesUtils";

const useStyles = makeStyles<ITheme, { color: string }>((theme: ITheme) => ({
    badge: {
        borderRadius: "5px",
        border: (props) => `2px solid ${props.color}`,
        fontSize: "0.8em",
        padding: "0 0.2em",
        marginRight: "0.2em",
    },
    text: {
        padding: "0 0.3em",
    },
    head: {
        fontWeight: "bold",
    },
    remote: {
        borderLeft: `1px solid ${theme.vscode.color.primary}`,
    },
}));

interface BranchBadgeProps extends React.HTMLProps<HTMLSpanElement> {
    reference: ICombinedRef;
    color: string;
}

const BranchBadge: React.FC<BranchBadgeProps> = ({
    reference,
    color,
    ...rest
}) => {
    const classes = useStyles({ color });
    const { name, remotes, isHead } = reference;

    return (
        <span {...rest} className={classes.badge}>
            <span className={`${classes.text} ${isHead ? classes.head : ""}`}>
                {name}
            </span>
            {remotes.map((remote) => (
                <span
                    key={remote}
                    className={`${classes.text} ${classes.remote}`}
                >
                    {remote}
                </span>
            ))}
        </span>
    );
};

export default BranchBadge;
