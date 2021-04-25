export const split: (
    s: string,
    delimiter: string,
    limit: number
) => string[] = (s, delimiter, limit) => {
    const parts = s.split(delimiter);
    return [
        ...parts.slice(0, limit - 1),
        parts.slice(limit - 1).join(delimiter),
    ];
};
