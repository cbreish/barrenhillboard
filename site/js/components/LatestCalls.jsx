var LatestCalls = React.createClass({
        
    componentDidMount: function () {
        var instance = this;
        socket.on('latest:update', function (data) {
            instance.setState(data);
        });
    },

    getInitialState: function () {
        return {
            calls: [{
                Type: '',
                Time: '',
                Location: ''
            }]
        };
    },

    render: function () {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 8000,
            arrows: false,
            vertical: true
        };
        return (
            <div className="widget latest color5">
                <h3 class="info">Latest Calls</h3>
                <Slider {...settings}>
                    {this.state.calls.map(function (call) {
                    return <div>
                            <div className="call">
                                <p className="callType"><span className="glyphicon glyphicon-fire"></span>&nbsp;{call.Type}</p>
                                <p className="callTime"><span className="glyphicon glyphicon-time"></span>&nbsp;{call.Time}</p>
                                <p>{call.Location}</p>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>
            );
    }
});

React.render(React.createElement(LatestCalls, {}), document.getElementById('latest'));