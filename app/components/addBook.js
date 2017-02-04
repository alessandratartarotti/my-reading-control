var React = require('react'),
	Bootstrap = require('react-bootstrap'),
	Fetch = require('isomorphic-fetch'),
	ListBooks = require('./ListBooks.js'),
	localstorage = require('./util.js'),
	_ = require('lodash');

var Navbar = Bootstrap.Navbar,
	Nav = Bootstrap.Nav,
	NavItem = Bootstrap.NavItem,
	Button = Bootstrap.Button,
	FormGroup = Bootstrap.FormGroup,
	FormControl = Bootstrap.FormControl,
	Grid = Bootstrap.Grid,
	Row = Bootstrap.Row;

var searchAPI = "http://openlibrary.org/search.json";

var AddBook = React.createClass({

	getInitialState: function() {
		return {
			searchedBooks: [],
			num_found: 0,
			searchAlreadyDone: false,
			loading: false
		}
		this.onChange = this.onChange.bind(this);
	},

	handleSearch: function(e) {
 		
 		e.preventDefault();

		this.setState({ 
			        	searchedBooks: [], 
			        	num_found: 0, 
			        	searchAlreadyDone: false,
			        	loading: true
		});	
		
		fetch(searchAPI + '?' + this.refs.selectType.value + '=' + this.refs.inputTitle.value)
			.then((response) => {

		        if (response.status >= 400) {
		            throw new Error("Bad response from server");
		        }

		        return response.json();
		    })
		    .then((response) => {
		   
		    	this.setState({ 
			        	searchedBooks: response.docs, 
			        	num_found: response.num_found, 
			        	searchAlreadyDone: true,
			        	loading:false
			    })	
		    });	
	},

	handleBooksSearched: function () {

		var myBooks = localstorage.get('my-books');

		var searchedBooks = [];

		if (this.state.num_found > 0) { 

			searchedBooks = this.state.searchedBooks; 

			searchedBooks = searchedBooks.map(function(item, index){

				//add some properties to identify which book has already been added

				var book = _.filter(myBooks, { 'id': item.key });
				var read = false;
				var readDate = null;
				var add = true;


				if(book.length > 0) {
					read = book[0].read;
					readDate = book[0].readDate;
					add = false;
				}

				var tempItem = {
				      id: item.key,
				      coverId: item.cover_i,
				      title: item.title,
				      author: item.author_name,
				      year: item.first_publish_year,
				      read: read,
				      readDate: readDate,
				      add: add
				  }  

				return (tempItem);

			}.bind(this));
		}

		return searchedBooks;

	},

	render: function() {

		var searchedBooks = this.handleBooksSearched();

		return (
			<div>
				<div className="starter-template">
            		<h1>Search for a book</h1>
            		<p className="lead">Find your book and add to your list.</p>
          		</div>
          		
				<form className="form-horizontal" onSubmit={ this.handleSearch }>
					<div className="form-group">						
						<div className="col-sm-2">
							<select ref="selectType" className="form-control" id="title" >
									<option value="author">Author</option>
									<option value="title">Title</option>
							</select>
						</div>
						<div className="col-sm-10">
							<input type="text" className="form-control"
							id="title" ref="inputTitle" placeholder="Title" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button type="submit" className="btn btn-primary pull-right">Search</button>
						</div>
					</div>
				</form>
				
				{this.state.loading ?  "Researching books..." : ""}

				{ this.state.searchAlreadyDone ?
					<div>
						<h3>{this.state.num_found > 0 ? "Results found ("+ this.state.num_found +")" : "No books were found"}</h3>					

						<ListBooks itens={searchedBooks} mode="add"/> 
					</div>
					
					: false
				}

			</div>
			
		);
	}

}); 

module.exports = AddBook;

