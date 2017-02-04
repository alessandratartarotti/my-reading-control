var React = require('react'),
	Bootstrap = require('react-bootstrap'),
	Book = require('./book.js'),
	SearchBooks = require('./searchBooks.js'),
	ReactRouter = require('react-router'),
	localstorage = require('./util.js'),
	_ = require('lodash');            


var Navbar = Bootstrap.Navbar,
	Nav = Bootstrap.Nav,
	NavItem = Bootstrap.NavItem,
	Button = Bootstrap.Button,
	FormGroup = Bootstrap.FormGroup,
	FormControl = Bootstrap.FormControl,
	Grid = Bootstrap.Grid,
	Row = Bootstrap.Row,
	Alert = Bootstrap.Alert,
	Link = ReactRouter.Link;
	

var ListBooks = React.createClass({

	getInitialState: function() {
		return {
			data: this.props.itens,
			queryText: '',
			queryType: ''
		} 
	}, 

	updateBook: function(item) {
		var index = _.findKey(this.state.data, function(o) { return o.id == item.id; });		
			var data  = this.state.data;
			data[index].read = !data[index].read;

			this.setState({
		      	data: data
		    }); 
	},

	deleteBook: function(item) {

		localstorage.deleteItem('my-books', item);

		//If called from the list, the book is deleted
		//Else If it is called from the search screen it can be added again, so it remains in the list

		if (this.props.mode == "list"){
			
			var deletedItem = _.filter(this.state.data, {'id' : item.id})

		    this.setState({
		    	data: _.without(this.state.data, deletedItem[0])
		    }); 

		} else {
						
			var index = _.findKey(this.state.data, function(o) { return o.id == item.id; });		
			var data  = this.state.data;
			data[index].add = true;
			this.setState({
		      	data: data
		    }); 
		}
	}, 

	searchBooks(q) {
		this.setState({
			queryText: q
    	}); 
    }, 

	searchBooksByType(type) {
		this.setState({
			queryType: type
    	}); 
    }, 
   
	render: function() {
		var queryText = this.state.queryText;
		var queryType = this.state.queryType;
		var filteredBooks = [];
		var myBooks = this.state.data; 

		if (this.props.mode == "list"){

			myBooks.forEach(function(item) {
				if(
					(item.year.toString().toLowerCase().indexOf(queryText)!=-1) ||
					(!!item.author && item.author.toString().toLowerCase().indexOf(queryText)!=-1) ||
					(item.title.toLowerCase().indexOf(queryText)!=-1)
					) {
					filteredBooks.push(item);
				}
			}); 

			switch (queryType) {
				case 'all':

				break;
				case 'missing-read':
				console.log('missing')
				filteredBooks = _.filter(filteredBooks, {'read' : false});

				break;
				case 'already-read':
				console.log('already')
				filteredBooks = _.filter(filteredBooks, {'read' : true});

				break;
			}

		} else {
			filteredBooks = this.state.data;
		}

		filteredBooks = filteredBooks.map(function(item, index){

			return(
				<Book item = { item }
				mode = {this.props.mode}
				key = { index }
				whichItem = { item }
				onDelete = { this.deleteBook }
				onUpdate = { this.updateBook }  />
				);
		}.bind(this));

		return (
			<div>			
				{(this.state.data.length > 0  && this.props.mode == "list")?
					<SearchBooks 
						 onSearch = { this.searchBooks }
						 onSelectionSearch = {this.searchBooksByType } /> :  ""
				}

				{(this.state.data.length == 0  && this.props.mode == "list")?
					<Alert bsStyle="info" onDismiss={this.handleAlertDismiss}>
						<h4>Start your control!</h4>
							<p>
								You still do not have books on your list. Add books you have read or will read 
								to start your control.
							</p>
							<p>
								<Link to="/add-book">Add new book</Link>
							</p>
					</Alert> : 
					""
				}

				<Grid bsClass="books">		
					{filteredBooks}				
				</Grid>
			</div>

		);
	}

}); 

module.exports = ListBooks;

