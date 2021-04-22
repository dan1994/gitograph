import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme, { color: string }>({
    badge: {
        borderRadius: "5px",
        border: (props) => `2px solid ${props.color}`,
        fontSize: "0.9em",
        fontWeight: "bold",
        padding: "0 0.2em",
    },
});

interface BranchBadgeProps extends React.HTMLProps<HTMLSpanElement> {
    name: string;
    color: string;
}

const BranchBadge: React.FC<BranchBadgeProps> = ({ name, color, ...rest }) => {
    const classes = useStyles({ color });
    return (
        <span {...rest} className={classes.badge}>
            {name}
        </span>
    );
};

export default BranchBadge;
