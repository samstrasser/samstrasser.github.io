var AppNav = React.createClass({displayName: "AppNav",
  render: function() {
    var sections = this.props.sections;
    var tags = [];
    for (tag in this.props.tags) {
      tags.push(this.props.tags[tag]);
    }
    var handleNav = this.props.handleNav;
    return (
      React.createElement("div", {className: "nav"}, 
        React.createElement("button", {className: "btn btn-default", onClick: handleNav.bind(null, 'basic')}, "Lists"), 
        React.createElement("button", {className: "btn btn-default", onClick: handleNav.bind(null, 'funnels')}, "Graph"), 
        
        React.createElement(DownloadLink, {sections: sections}), 

        React.createElement("hr", null), 
        
        React.createElement("ol", null, 
          tags.map(function(tag){
            return React.createElement("li", null, tag);
          })
        )
      )
    )
  }
});