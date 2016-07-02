import React from 'react';

var Images = React.createClass({
    componentDidMount: function () {
        var instance = this;
        this.props.socket.on('images:update', function (data) {
            instance._updateImage(data);
        });
    },

    _updateImage: function(data) {
        this.setState(data);
    },

    getInitialState: function () {
        return {
            image: ''
        };
    },
    render: function () {
        return (
            <div className="widget image">
                    <img src={this.state.image} />
            </div>
            );
    }
});

export default Images;

