import React from 'react';

const TimelineItem = ({ data }) => (
    <div className="timeline-item">
        <div className="timeline-item-content">
        {data.link && (
            <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="tag">
                    {data.name}
                </span>
                <time>{data.year}</time>
                <p>{data.description}</p>
                {data.img_url && (
                    <img src={data.img_url} alt='' />
                )}
                <span className="circle" />
            </a>
        )}
        </div>
    </div>
);

export default TimelineItem;