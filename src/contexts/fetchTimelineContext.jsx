import { createContext, useState } from "react";

const FetchTimelineContext = createContext();

export function FetchTimelineProvider ({ children }) {

    const [fetch, setFetch] = useState(Date.now());

    function fetchTimeline () {
        setFetch(Date.now());
    }

    return (
        <FetchTimelineContext.Provider value={{fetch, fetchTimeline}}>
            {children}
        </FetchTimelineContext.Provider>
    );
}

export default FetchTimelineContext;