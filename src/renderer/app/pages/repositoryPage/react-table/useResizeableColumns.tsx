import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

type MouseEventFunc = (e: MouseEvent) => void;

interface ColumnOptions {
    widthPrecentage?: number;
}

type GetCellPropsFunc = (
    index: number
) => {
    style: {
        width: string;
    };
    isResizeable: boolean;
};

interface ResizerProps {
    ref: React.MutableRefObject<HTMLDivElement>;
    onMouseDown: React.MouseEventHandler;
}

type GetResizerPropsFunc = (index: number) => ResizerProps;

interface ResizeableColumnsState {
    getCellProps: GetCellPropsFunc;
    getResizerProps: GetResizerPropsFunc;
}

type UseResizeableColumnsHook = (
    id: string,
    columnsOptions: ColumnOptions[],
    onResize: (widths: number[]) => void
) => ResizeableColumnsState;

const useResizeableColumns: UseResizeableColumnsHook = (
    id,
    columnsOptions,
    onResize
) => {
    const [widths, setWidths] = useState<string[]>(
        getInitialWidths(columnsOptions)
    );

    const getCellProps: GetCellPropsFunc = (index) => {
        return {
            style: {
                width: widths[index],
            },
            isResizeable: index !== columnsOptions.length - 1,
        };
    };

    const getResizerProps: GetResizerPropsFunc = (index) => {
        const resizer = useRef<HTMLDivElement>(null);
        const prevX = useRef(null);

        const mouseMove: MouseEventFunc = (e) => {
            if (!(resizer.current && prevX.current)) {
                return;
            }

            const currentX = e.clientX;
            const delta = currentX - prevX.current;
            prevX.current = currentX;

            const {
                x: resizerX,
                width: resizerWidth,
            } = resizer.current.getBoundingClientRect();
            const resizerMiddle = resizerX + resizerWidth / 2;

            const parent = resizer.current.parentElement;
            const { width: parentWidth } = parent.getBoundingClientRect();
            const parentSibling = parent.nextElementSibling;
            const {
                width: parentSiblingWidth,
            } = parentSibling.getBoundingClientRect();

            if (
                (delta < 0 && currentX > resizerMiddle) ||
                (delta > 0 && currentX < resizerMiddle)
            ) {
                return;
            }

            const correctedDelta =
                delta <= 0
                    ? Math.max(delta, -parentWidth)
                    : Math.min(delta, parentSiblingWidth);

            const rowWidth = getTableRowWidth(id);

            const newParentWidth =
                ((parentWidth + correctedDelta) * 100) / rowWidth;
            const newParentSiblingWidth =
                ((parentSiblingWidth - correctedDelta) * 100) / rowWidth;

            const newWidths = [...widths];
            newWidths[index] = `${newParentWidth}%`;
            newWidths[index + 1] = `${newParentSiblingWidth}%`;
            setWidths(newWidths);
        };

        const mouseUp: MouseEventFunc = () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
        };

        const mouseDown: React.MouseEventHandler = (e) => {
            prevX.current = e.clientX;

            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        };

        return {
            ref: resizer,
            onMouseDown: mouseDown,
        };
    };

    useEffect(() => {
        onResize(getTableColumnWidths(id));
    }, [widths]);

    return {
        getCellProps,
        getResizerProps,
    };
};

const ResizeableColumnsContext = createContext(null);

const ResizeableColumnsContextProvider: React.FC<{
    id: string;
    columnsOptions: ColumnOptions[];
    onResize: (widths: number[]) => void;
    children?: React.ReactNode;
}> = ({ id, columnsOptions, onResize, children }) => {
    return (
        <ResizeableColumnsContext.Provider
            value={useResizeableColumns(id, columnsOptions, onResize)}
        >
            {children}
        </ResizeableColumnsContext.Provider>
    );
};

const useResizeableColumnsContext: () => ResizeableColumnsState = () => {
    return useContext<ResizeableColumnsState>(ResizeableColumnsContext);
};

const getInitialWidths: (columnsOptions: ColumnOptions[]) => string[] = (
    columnsOptions
) => {
    let accumulatedPrecentage = 0;
    let numberOfColumnsWithNoDefault = 0;

    columnsOptions.forEach(({ widthPrecentage }) => {
        if (widthPrecentage) {
            accumulatedPrecentage += widthPrecentage;
        } else {
            numberOfColumnsWithNoDefault += 1;
        }
    });

    return columnsOptions.map(
        ({ widthPrecentage }) =>
            `${
                widthPrecentage ||
                (100 - accumulatedPrecentage) / numberOfColumnsWithNoDefault
            }%`
    );
};

const getTableElementsByRole: (
    id: string,
    role: string
) => NodeListOf<Element> = (id, role) => {
    const table = document.getElementById(id);
    return table.querySelectorAll(`[role="${role}"]`);
};

const getTableColumnWidths = (id: string) => {
    const cells = getTableElementsByRole(id, "columnheader");
    return Array.from(cells).map((cell) => cell.getBoundingClientRect().width);
};

const getTableRowWidth = (id: string) => {
    const headerRow = getTableElementsByRole(id, "row")[0];
    return headerRow.getBoundingClientRect().width;
};

export {
    ColumnOptions,
    useResizeableColumnsContext,
    ResizeableColumnsContextProvider,
};
