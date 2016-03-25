var Calendar = React.createClass({
        
    componentDidMount: function () {
        var instance = this;
        socket.on('calendar:update', function (data) {
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
                                    <p className="number">{moment(event.dateTime).format('D')}</p>
                                    <p className="month">{moment(event.dateTime).format('MMM')}</p>
                                </div>
                                <div className="info">
                                    <p className="title">{event.title}</p>
                                    <p className="title">{event.title2}</p>
                                    <p className="datetime">
                                        <span className="glyphicon glyphicon-time"></span>
                                        &nbsp;{moment(event.dateTime).format('dddd MMMM Do') + ' at ' + moment(event.dateTime).format('h:mm A')}
                                    </p>
                                </div>
                            </div>
                })}
            </div>
            );
    }
});

React.render(React.createElement(Calendar, {}), document.getElementById('calendar'));