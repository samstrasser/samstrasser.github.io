var AppNav = React.createClass({displayName: "AppNav",
  render: function() {
    var sections = this.props.sections;
    var tags = this.props.tags;
    var handleNav = this.props.handleNav;
    var handleFilter = this.props.handleFilter;

    return (
      React.createElement("div", {className: "nav"}, 
        React.createElement("button", {className: "btn btn-default", 
          onClick: handleNav.bind(null, 'basic')}, "Lists"), 
        React.createElement("button", {className: "btn btn-default", 
          onClick: handleNav.bind(null, 'funnels')}, "Graph"), 
        
        React.createElement(DownloadLink, {sections: sections}), 

        React.createElement("hr", null)
        
      /* 
        Filters

        {Object.keys(tags).map(function(k){
          var tag = tags[k];
          var classes = 'btn btn-default';
          if (tag.active) {
            classes += ' active';
          }
          return (
            <button className={classes} key={tag.id}
              onClick={handleFilter.bind(null, tag)}>{tag.name}</button>
          )
        })}
      */
      )
    )
  }
});