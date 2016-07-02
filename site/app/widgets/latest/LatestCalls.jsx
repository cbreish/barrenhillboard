import React from 'react';
import Slider from 'react-slick';

var LatestCalls = React.createClass({
        
    componentDidMount: function () {
        var instance = this;
        this.props.socket.on('latest:update', function (data) {
            instance.setState(data);
        });
    },

    getInitialState: function () {
        return {
            calls: [{
                Type: '',
                Time: '',
                Location: ''
            }],
			apiKey: ''
        };
    },

    render: function () {
        var settings = {
            dots: false,
            infinite: true,
            speed: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 10000,
            arrows: false,
            vertical: true
        };
		var apiKey = this.state.apiKey;
		
        return (
            <div className="widget latest color5">
                <h3 className="info">Latest Calls</h3>
                <Slider {...settings}>
                    {this.state.calls.map(function (call) {
					
					var mapUrl;
					var mapImg;

					if (call.Latitude && call.Longitude && apiKey) {
						mapUrl = "https://api.mapbox.com/v4/mapbox.streets-satellite/pin-l-fire-station+FF0000(" + call.Longitude + "," + call.Latitude + ")/" + call.Longitude + "," + call.Latitude + ",17/900x235.png?access_token=" + apiKey;
						mapImg = <img src={mapUrl} />;
					}
										
                    return <div key={call.id}>
                            <div className="call">
                                <p className="callType"><span className="glyphicon glyphicon-fire"></span>&nbsp;{call.Type}</p>
                                <p className="callTime"><span className="glyphicon glyphicon-time"></span>&nbsp;{call.Time}</p>
                                <p>{call.Location}</p>
								{mapImg}
                            </div>
                        </div>
                    })}
                </Slider>
            </div>
            );
    }
});

export default LatestCalls;