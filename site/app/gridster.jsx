import React from 'react';
import io from 'socket.io-client';

class Widget extends React.Component {
	render () {
		return 	React.createElement(
					'li',
					{ 
						'data-row': this.props.widget.row,
						'data-col': this.props.widget.col,
						'data-sizex': this.props.widget.sizex,
						'data-sizey': this.props.widget.sizey,
					}, 
					React.createElement(
						this.props.widget.name, {socket: this.props.socket}
					)
				);
	};
}

class Gridster extends React.Component {
	componentWillMount() {
		var url = window.location.href;
		this.socket = io(url);
			
		this.socket.on('connected', function () {
			console.log('connected');
		});

		this.socket.on('refreshPage', function () {
			console.log('received refresh page command');
			location.reload(true);
		});

		this.socket.on('*', function (msg) {
			console.log('Received Message: ' + JSON.stringify(msg));
		});
	}
	componentDidMount() {
		$(".gridster ul").gridster({
			widget_base_dimensions: this.props.settings.widget_base_dimensions,
			widget_margins: this.props.settings.widget_margins,
			min_cols: this.props.settings.min_cols,
			max_cols: this.props.settings.max_cols,
			min_rows: this.props.settings.min_rows,
			max_rows: this.props.settings.max_rows
		}).width("auto");
	}
	render() {
		var socket = this.socket;
		return (
			<div className='gridster'>
				<ul>
					{this.props.widgets.map(function(widget) {
					  return <Widget widget={widget} socket={socket}/>;
					})}
				</ul>
			</div>
		);
	}
}

export default Gridster;