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
	

var SearchBooks = React.createClass({

	getInitialState: function() {
		return {
			searchType: "all"
		} 
	}, 

	handleSearch: function(e) {

		this.props.onSearch(e.target.value);
	},

	handleSearchBySelection(type) {
		this.setState({ searchType: type});
		this.props.onSelectionSearch(type);
	},

	render: function() {

		return (
			<div>							
				<Navbar>
					<Navbar.Header>
						<Navbar.Toggle />
						<Navbar.Brand>
							Filter
						</Navbar.Brand>
					</Navbar.Header>
					<Navbar.Collapse> 
						<Nav bsStyle="pills" activeKey={this.state.searchType} pullLeft onSelect={this.handleSearchBySelection}>
							<NavItem eventKey={'already-read'}>Alread read</NavItem>
							<NavItem eventKey={'missing-read'}>Missing read</NavItem>
							<NavItem eventKey={'all'}>All books</NavItem>
						</Nav>
						<Navbar.Form pullRight>
							<FormGroup bsClass="margin-right-20">
								<FormControl type="text" onChange={ this.handleSearch } placeholder="Search" />
							</FormGroup>
							{' '}
							
						</Navbar.Form>
					</Navbar.Collapse>
				</Navbar>	
			</div>

		);
	}

}); 

module.exports = SearchBooks;

