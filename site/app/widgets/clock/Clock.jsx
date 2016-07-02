import React from 'react';
import Moment from 'moment';

var Clock = React.createClass({
        
    updateDate: function() {
        this.setState({
            dateTime: Moment()
        });
    },
    
    componentDidMount: function () {
        setInterval(this.updateDate, 5000);
    },

    getInitialState: function () {
        return {
            dateTime: Moment()
        };
    },

    render: function () {
        return (
            <div className="widget clock color4">
                    <p className="dateline">{this.state.dateTime.format("MMMM Do YYYY")}</p>
                    <p className="timeline">{this.state.dateTime.format("h:mm a")}</p>
            </div>
            );
    }
});

export default Clock;