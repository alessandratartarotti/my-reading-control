var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    ReactRouter = require('react-router');

var Navbar = Bootstrap.Navbar,
    Nav = Bootstrap.Nav,
    NavItem = Bootstrap.NavItem,
    Link = ReactRouter.Link,
    IndexLink = ReactRouter.IndexLink;

var App = React.createClass({

  render: function() {

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">My reading control</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem><IndexLink to="/"> My books</IndexLink></NavItem>
            <NavItem><Link to="/add-book">Add new book</Link></NavItem>
            <NavItem><Link to="/graphs">Graphs</Link></NavItem>
          </Nav>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
      
    );
  }

}); 

module.exports = App;

