var React = require('react'),
	_ = require('lodash'),
	localstorage = require('./util.js'),
	BarChart = require('react-d3/barchart').BarChart;

var monthNames = [
	"January", 
	"February", 
	"March", 
	"April", 
	"May", 
	"June",
	"July", 
	"August", 
	"September", 
	"October", 
	"November", 
	"December"
];

var Graphs = React.createClass({

	getInitialState: function() {
		return {
			data: localstorage.get('my-books'),
			thisYear: new Date().getFullYear(),
			year: new Date().getFullYear()
		}
	}, 

	getDataChart : function() {

		var myBooks = this.state.data;
		var year = this.state.year;
		var defaultDataChart = [
			{ "x": 'January', "y":  0},
			{ "x": 'February', "y": 0},
			{ "x": 'March', "y": 0},
			{ "x": 'April', "y": 0},
			{ "x": 'May', "y": 0},
			{ "x": 'June', "y": 0},
			{ "x": 'July', "y": 0},
			{ "x": 'August', "y": 0},
			{ "x": 'September', "y": 0},
			{ "x": 'October', "y": 0},
			{ "x": 'November', "y": 0},
			{ "x": 'December', "y": 0}
		];

		var dataChart = defaultDataChart;

		myBooks.forEach(function(item) {
			if((item.read && item.readDate != null && new Date(item.readDate).getFullYear() == year)) {
				var monthName = monthNames[new Date(item.readDate).getMonth()];
				var item = _.find(dataChart, function(o) { return o.x === monthName; });
				item["y"] = item["y"] + 1;
			}
		}); 

		return dataChart;
	}, 

	render: function() {

		var dataChart = this.getDataChart();

		var barData = [
			{
				"name": "Read books",
				"values": dataChart
			}
		];

		return (
			<div>
				<div className="starter-template">
            		<h1>My anual control</h1>
            		<p className="lead"></p>
          		</div>

				 <BarChart 
				 	data={barData} 
					width={1000}
		        	height={400}
				 	title={this.state.year} 
				 	yAxisLabel="Number of books"/>
			</div>		  
		);
	}
});

module.exports = Graphs;