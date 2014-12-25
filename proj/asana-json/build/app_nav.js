var AppNav = React.createClass({displayName: "AppNav",
  render: function() {
    var sections = this.props.sections;
    var handleNav = this.props.handleNav;
    return (
      React.createElement("div", {className: "nav"}, 
        React.createElement("button", {onClick: handleNav.bind(null, 'basic')}, "Lists"), 
        React.createElement("button", {onClick: handleNav.bind(null, 'funnels')}, "Graph"), 
        
        React.createElement("hr", null), 
        
        sections.length > 0 && 
          React.createElement(DownloadLink, {sections: sections})
      
      
      )
    )
  }
});