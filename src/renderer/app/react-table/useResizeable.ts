import * as React from "react";
import { useRef } from "react";

export type OnDragFunc = (width1: number, width2: number) => void;

type MouseEventFunc = (e: MouseEvent) => void;

type UseResizeableHook = (
    onDrag: OnDragFunc
) => {
    ref: React.MutableRefObject<HTMLDivElement>;
    onMouseDown: React.MouseEventHandler;
};

export const useResizeable: UseResizeableHook = (onDrag) => {
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

        onDrag(
            parentWidth + correctedDelta,
            parentSiblingWidth - correctedDelta
        );
    };

    const mouseUp: MouseEventFunc = () => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
    };

    const mouseDown: MouseEventFunc = (e) => {
        prevX.current = e.clientX;

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
    };

    return {
        ref: resizer,
        onMouseDown: (mouseDown as unknown) as React.MouseEventHandler,
    };
};
