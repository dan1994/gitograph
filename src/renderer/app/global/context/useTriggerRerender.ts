import { useState } from "react";

const useTriggerRerender: () => () => void = () => {
    const [value, setValue] = useState(false);

    return () => {
        setValue(!value);
    };
};

export default useTriggerRerender;
