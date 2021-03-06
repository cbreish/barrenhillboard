﻿var OfficerList = React.createClass({
    componentDidMount: function () {
        var instance = this;
        socket.on('officers:update', function (data) {
            instance.setState(data);
        });
    },

    getInitialState: function () {
        return {
            title: '',
            people: []
        };
    },
    render: function () {
        return (
            <div className="widget officers color2">
                <h2>{this.state.title}</h2>
                <div>
                    {this.state.people.map(function (person) {
                        return <p key={person.name}><span className="name">{person.name}</span><span className="title">{person.title}</span></p>
                    })}
                </div>
             </div>
            );
    }
});

React.render(React.createElement(OfficerList, {}), document.getElementById('officerList'));

