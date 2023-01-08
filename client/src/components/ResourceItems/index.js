import React from "react";
import ResourceList from "../ResourceList";

const ResourceItems = () => {
    return (
        <>
            {ResourceList.map((resource) => (
                <div key={resource}>
                    <h2>{resource.title}</h2>
                    <p className="mainText">{resource.description}</p>
                </div>
            ))}
        </>
    );
};

export default ResourceItems;