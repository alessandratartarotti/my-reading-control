var React = require('react'),
	Bootstrap = require('react-bootstrap'),
	ListBooks = require('./ListBooks.js'),
	localstorage = require('./util.js');


var Navbar = Bootstrap.Navbar,
	Nav = Bootstrap.Nav,
	NavItem = Bootstrap.NavItem,
	Button = Bootstrap.Button,
	FormGroup = Bootstrap.FormGroup,
	FormControl = Bootstrap.FormControl,
	Grid = Bootstrap.Grid,
	Row = Bootstrap.Row;


var MyBooks = React.createClass({

	getInitialState: function() {
		return {
			data: localstorage.get('my-books'),
			title: "My Books"
		} 
	}, 

	render: function() {

		return (
			<div>
				<div className="starter-template">
            		<h1>My Books</h1>
            		<p className="lead">List of books that I alread read or missing to read.</p>
          		</div>
				<ListBooks itens={this.state.data} mode="list"/>
			</div>
		);
	}

}); 

module.exports = MyBooks;

