import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_TOPICS, QUERY_ME } from "../../utils/queries";
import Topic from "../Topic";


const Topics = () => {

    const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(QUERY_ME);

    const userData = dataMe?.me || {};
    const [expanded, setExpanded] = React.useState(false);

    const { loading, error, data } = useQuery(QUERY_ALL_TOPICS);


    // object to keep the topic data
    const topicData = data?.topics || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;


    return (
        <>
            {topicData.map((topic) => {
                return (
                    <div className="topicBox">
                        <Topic topic={topic} />
                    </div>
                );
            })}
        </>
    );
};

export default Topics;