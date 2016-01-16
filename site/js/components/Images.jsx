var Images = React.createClass({
    componentDidMount: function () {
        var instance = this;
        socket.on('images:update', function (data) {
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

React.render(React.createElement(Images, {}), document.getElementById('images'));

