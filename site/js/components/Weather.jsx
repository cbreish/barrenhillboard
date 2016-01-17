var Weather = React.createClass({
        
    componentDidMount: function () {
        var instance = this;
        socket.on('weather:update', function (data) {
            instance.setState(data);
        });
    },

    componentDidUpdate: function() {
        var skycons = new Skycons({"color": "white"});
        var iconToday = React.findDOMNode(this.refs.iconToday);
        skycons.add(iconToday, iconToday.dataset.icon);
        skycons.play();
    },

    getInitialState: function () {
        return {
            temp: '',
            description: '',
            icon: '',
            feelsLike: '',
            nextHour: '',
            nextDay: ''
        };
    },

    render: function () {
        return (
            <div className="widget weather color2">
                    <div>
                        <p className="temperature">
                            <canvas id="iconToday" ref="iconToday" width="48" height="48" data-icon={this.state.icon} className="imgCircle"></canvas>
                            {this.state.temp}&deg;
                        </p>
                        <p className="description">{this.state.description} - Feels like {this.state.feelsLike}&deg;</p>
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
//<span className="glyphicon glyphicon-cloud weatherIcon"></span>