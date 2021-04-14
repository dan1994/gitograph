import * as React from "react";

interface CommitIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    color?: string;
    size?: number;
}

const CommitIcon: React.FC<CommitIconProps> = ({
    className,
    color = "black",
    size = 50,
    ...rest
}) => {
    return (
        <svg
            {...rest}
            width={size}
            height={size}
            viewBox="0 0 50 30"
            className={className}
        >
            <g>
                <line
                    x1="0"
                    y1="15"
                    x2="15"
                    y2="15"
                    stroke={color}
                    stroke-width="8"
                />
                <line
                    x1="35"
                    y1="15"
                    x2="50"
                    y2="15"
                    stroke={color}
                    stroke-width="8"
                />
                <circle
                    r="10"
                    cx="25"
                    cy="15"
                    fill="none"
                    stroke={color}
                    stroke-width="8"
                />
            </g>
        </svg>
    );
};

export default CommitIcon;
