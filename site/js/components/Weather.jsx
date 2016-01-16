var Weather = React.createClass({
        
    componentDidMount: function () {
        var instance = this;
        socket.on('weather:update', function (data) {
            instance.setState(data);
        });
    },

    getInitialState: function () {
        return {
            temp: '',
            description: '',
            feelsLike: '',
            nextHour: '',
            nextDay: ''
        };
    },

    render: function () {
        return (
            <div className="widget weather color2">
                    <div>
                        <p className="temperature"><span className="glyphicon glyphicon-cloud weatherIcon"></span>{this.state.temp}</p>
                        <p className="description">{this.state.description} - Feels like {this.state.feelsLike}</p>
                        <p className="header">Next Hour</p>
                        <p className="description">{this.state.nextHour}</p>
                        <p className="header">Next 24 Hours</p>
                        <p className="description">{this.state.nextDay}</p>
                    </div>
                </div>
            );
    }
});

React.render(React.createElement(Weather, {}), document.getElementById('weather'));
