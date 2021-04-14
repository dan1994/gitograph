import * as React from "react";

interface RepositoryIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    color?: string;
    size?: number;
}

const RepositoryIcon: React.FC<RepositoryIconProps> = ({
    className,
    color = "black",
    size = 50,
    ...rest
}) => {
    return (
        <svg
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -2 28 28"
            width={size}
            height={size}
            className={className}
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                d="M13 21v2.5l-3-2-3 2V21h-.5A3.5 3.5 0 0 1 3 17.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-7zm0-2h6v-3H6.5a1.5 1.5 0 0 0 0 3H7v-2h6v2zm6-5V4H6v10.035A3.53 3.53 0 0 1 6.5 14H19zM7 5h2v2H7V5zm0 3h2v2H7V8zm0 3h2v2H7v-2z"
                fill={color}
            />
        </svg>
    );
};

export default RepositoryIcon;
