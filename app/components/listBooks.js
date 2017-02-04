var React = require('react'),
	Bootstrap = require('react-bootstrap'),
	Book = require('./book.js'),
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
			data: this.props.itens
		} 
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

	render: function() {

		var filteredBooks = this.state.data;

  		filteredBooks = filteredBooks.map(function(item, index){

  			return(
  				<Book item = { item }
  						key = { index }
	  					whichItem = { item }
	  					onDelete = { this.deleteBook } />
  			);
  		}.bind(this));

		return (
			<div>
			
				{(filteredBooks.length > 0  && this.props.mode == "list")?

				<Navbar>
					<Navbar.Header>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav bsStyle="pills" activeKey={1} pullLeft>
							<NavItem>Alread ready</NavItem>
							<NavItem>Missing read</NavItem>
							<NavItem>All books</NavItem>
						</Nav>
						<Navbar.Form pullRight>
							<FormGroup>
								<FormControl type="text" placeholder="Search" />
							</FormGroup>
							{' '}
							<Button type="submit">Submit</Button>
						</Navbar.Form>
					</Navbar.Collapse>
				</Navbar>	: 
					""
				}

				{(filteredBooks.length == 0  && this.props.mode == "list")?
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

