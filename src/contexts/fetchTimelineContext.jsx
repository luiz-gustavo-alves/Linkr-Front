import { createContext, useState } from "react";

const FetchTimelineContext = createContext();

export function FetchTimelineProvider ({ children }) {

    const [fetch, setFetch] = useState(Date.now());
    const [postOption, setPostOption] = useState(null);

    function fetchTimeline () {
        setFetch(Date.now());
    }

    function updatePostOption(option) {
        setPostOption(option);
    }

    return (
        <FetchTimelineContext.Provider value={{fetch, postOption, fetchTimeline, updatePostOption}}>
            {children}
        </FetchTimelineContext.Provider>
    );
}

export default FetchTimelineContext;