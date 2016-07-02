import React from 'react';
import {render} from 'react-dom';
import Gridster from './gridster.jsx';

import Calendar from './widgets/calendar/Calendar.jsx';
import Clock from './widgets/clock/Clock.jsx';
import Weather from './widgets/weather/Weather.jsx';
import OfficerList from './widgets/officers/OfficerList.jsx';
import Header from './widgets/header/Header.jsx';
import Images from './widgets/images/Images.jsx';
import LatestCalls from './widgets/latest/LatestCalls.jsx';

var gridSettings = {
	widget_base_dimensions: [460, 110],
	widget_margins: [5, 5],
	min_cols: 4,
	max_cols: 4,
	min_rows: 9,
	max_rows: 9
}

var widgets = [
	{ 
		name: Clock,
		row: 1,
		col: 1,
		sizex: 1,
		sizey: 1
	},
	{ 
		name: Weather,
		row: 2,
		col: 1,
		sizex: 1,
		sizey: 4
	},
	{ 
		name: OfficerList,
		row: 5,
		col: 1,
		sizex: 1,
		sizey: 4
	},
	{ 
		name: Header,
		row: 1,
		col: 2,
		sizex: 2,
		sizey: 1
	},
	{ 
		name: Images,
		row: 2,
		col: 2,
		sizex: 2,
		sizey: 5
	},
	{ 
		name: LatestCalls,
		row: 9,
		col: 2,
		sizex: 2,
		sizey: 3
	},
	{ 
		name: Calendar,
		row: 1,
		col: 4,
		sizex: 1,
		sizey: 9
	}
];

class App extends React.Component {
  render () {
    return (
		<Gridster widgets={widgets} settings={gridSettings}/>
	);
  }
}

render(<App/>, document.getElementById('app'));