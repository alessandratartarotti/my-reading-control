var React = require('react'),
	ReactDOM = require('react-dom'),
	ReactRouter = require('react-router'),
	App = require('./app.js'),
	AddBook = require('./addBook.js'),
	Graphs = require('./graphs.js'),
	MyBooks = require('./myBooks.js');

var Router = ReactRouter.Router,
	Route = ReactRouter.Route,
	IndexRoute = ReactRouter.IndexRoute,
	hashHistory = ReactRouter.hashHistory;

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
        	<IndexRoute component={MyBooks} />
        	<Route path="my-books" component={MyBooks}/>
        	<Route path="add-book" component={AddBook} />
        	<Route path="graphs" component={Graphs} />
        </Route>
    </Router>,
    document.getElementById('react-container')
); 

