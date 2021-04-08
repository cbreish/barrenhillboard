var Weather = React.createClass({
        
    componentDidMount: function () {
        var instance = this;
        socket.on('weather:update', function (data) {
            instance.setState(data);
        });
    },

    componentDidUpdate: function() {
        var skycons = new Skycons({"color": "black"});
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
                    <div className="body">
                        <p className="temperature">
                            <canvas id="iconToday" ref="iconToday" width="72" height="72" data-icon={this.state.icon} className="imgCircle"></canvas>
                            {this.state.temp}&deg;
                        </p>
                        <p className="description">{this.state.description} - Feels like {this.state.feelsLike}&deg;</p>
                        <p className="header">Next Hour</p>
                        <p className="description">{this.state.nextHour}</p>
                        <p className="header">Next 24 Hours</p>
                        <p className="description">{this.state.nextDay}</p>
                    </div>
					<div className="footer">
						<p>forecast.io - last updated {moment.unix(this.state.updated).fromNow()}</p>
					</div>
                </div>
            );
    }
});

React.render(React.createElement(Weather, {}), document.getElementById('weather'));
//<span className="glyphicon glyphicon-cloud weatherIcon"></span>