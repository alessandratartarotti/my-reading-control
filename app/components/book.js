var React = require('react');
var Bootstrap = require('react-bootstrap'),
	_ = require('lodash'),
	localstorage = require('./util.js');

var Grid = Bootstrap.Grid,
	Row = Bootstrap.Row,
	Col = Bootstrap.Col,
	Thumbnail = Bootstrap.Thumbnail,
	Button = Bootstrap.Button,
	ButtonToolbar = Bootstrap.ButtonToolbar,
	Glyphicon = Bootstrap.Glyphicon,
	Media = Bootstrap.Media,
	Image = Bootstrap.Image;


var Book = React.createClass({ 

	getInitialState: function() {
		return {
			read: this.props.item.read,
			readDate: this.props.item.readDate,
			add: this.props.item.add
		}
	},

	handleDelete: function() {
		this.props.onDelete(this.props.whichItem);
		this.setState({ add: true})
	},

	handleAdd: function() {
		var tempItem = {
		      id: this.props.item.id,
		      coverId: this.props.item.coverId,
		      title: this.props.item.title,
		      author: this.props.item.author,
		      year: this.props.item.year,
		      read: false,
		      readDate: null
		    } 
		localstorage.addItem('my-books', tempItem); 
		this.setState({ add: false})
	},

	handleRead: function() {
		var allData = localstorage.get('my-books');
		var index = _.findKey(allData, ['id', this.props.item.id]);

		if (typeof index !== 'undefined') {
			allData[index].read = !this.state.read;
			allData[index].readDate = new Date();
			localstorage.set('my-books', allData);
			this.setState({ read : !this.state.read });
		}	
	},

	render: function() {

		var image = (!!this.props.item.coverId ? 
							"http://covers.openlibrary.org/b/ID/" + this.props.item.coverId + "-S.jpg" : 
							"https://openlibrary.org/images/icons/avatar_book-sm.png");

		return(		
			<Media>
				<Media.Left>
					<Image src={image} heigth="58" width="38" />
				</Media.Left>
				<Media.Body>
				<Media.Heading>{this.props.item.title}</Media.Heading>	
					<p>{this.props.item.author}</p>
					<p>{this.props.item.year}</p>

					{this.state.add}
					{(this.state.add)?
						<p>
							<Button bsSize="xsmall" title="Add Book" bsStyle="success" onClick={(e) => this.handleAdd(e)}>
								<Glyphicon glyph="plus" /> Add
							</Button> 
						</p>
						:
						<p>
							<Button bsSize="xsmall" 
									bsStyle="danger" 
									title="Remove Book" 
									onClick={(e) => this.handleDelete(e)}>
								<Glyphicon glyph="remove" /> Remove
							</Button>

				  			<label className="margin-left-20">
								<input type="checkbox" 
								onChange={(e) => this.handleRead(e)} 
								checked={this.state.read} />
									Read
							</label>
				   		</p>
					}		
				</Media.Body>
			</Media>
			);
		
	} 

}); 

module.exports = Book;