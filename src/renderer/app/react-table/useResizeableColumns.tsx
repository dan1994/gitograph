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

const getTableColumnWidths = (id: string) => {
    const table = document.getElementById(id);
    const cells = table.querySelectorAll('[role="columnheader"]');
    return Array.from(cells).map((cell) => cell.getBoundingClientRect().width);
};

const useResizeableColumns: UseResizeableColumnsHook = (
    id,
    columnsOptions,
    onResize
) => {
    const [widths, setWidths] = useState<string[]>(
        columnsOptions.map(
            (column) =>
                `${column.widthPrecentage || 100 / columnsOptions.length}%`
        )
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

            const newParentWidth = parentWidth + correctedDelta;
            const newParentSiblingWidth = parentSiblingWidth - correctedDelta;

            const newWidths = [...widths];
            newWidths[index] = `${newParentWidth}px`;
            newWidths[index + 1] = `${newParentSiblingWidth}px`;
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

export {
    ColumnOptions,
    useResizeableColumnsContext,
    ResizeableColumnsContextProvider,
};
