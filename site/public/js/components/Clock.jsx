var Clock = React.createClass({
        
    updateDate: function() {
        this.setState({
            dateTime: moment()
        });
    },
    
    componentDidMount: function () {
        setInterval(this.updateDate, 5000);
    },

    getInitialState: function () {
        return {
            dateTime: moment()
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

React.render(React.createElement(Clock, {}), document.getElementById('clock'));

