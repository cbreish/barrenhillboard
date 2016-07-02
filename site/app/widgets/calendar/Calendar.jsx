import React from 'react';
import Moment from 'moment';

var Calendar = React.createClass({
        
    componentDidMount: function () {
        var instance = this;
        this.props.socket.on('calendar:update', function (data) {
            instance.setState(data);
        });
    },

    getInitialState: function () {
        return {
            events :[]
        };
    },

    render: function () {
        return (
            <div className="widget events color3">
                {this.state.events.map(function (event) {
                    return <div className="event" key={event.id}>
                                <div className="date">
                                    <p className="number">{Moment(event.dateTime).format('D')}</p>
                                    <p className="month">{Moment(event.dateTime).format('MMM')}</p>
                                </div>
                                <div className="info">
                                    <p className="title">{event.title}</p>
                                    <p className="title">{event.title2}</p>
                                    <p className="datetime">
                                        <span className="glyphicon glyphicon-time"></span>
                                        &nbsp;{Moment(event.dateTime).format('dddd MMMM Do') + ' at ' + Moment(event.dateTime).format('h:mm A')}
                                    </p>
                                </div>
                            </div>
                })}
            </div>
            );
    }
});

export default Calendar;