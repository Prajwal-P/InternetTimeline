import React, { Component } from 'react';
import TimelineItem from './TimelineItem.js';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timelineData: []
        };
    }

    componentDidMount = () => {
        fetch('http://localhost:8888/route/allEvents')
            .then(result => result.json())
            .then(
                res => {
                    // console.log(res);
                    if (res.status === 200) {
                        this.setState({
                            timelineData: res.data,
                        });
                    }
                }
            )
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            this.state.timelineData.length > 0 && (
                <div className="timeline-container">
                    {this.state.timelineData.map((data, idx) => (
                        <TimelineItem data={data} key={idx} />
                    ))}
                </div>
            )
        )
    }
}

export default Timeline;