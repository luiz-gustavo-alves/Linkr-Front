import { useContext } from "react";
import FetchTimelineContext from "../contexts/fetchTimelineContext";

const useFetchTimeline = () => useContext(FetchTimelineContext);

export default useFetchTimeline;