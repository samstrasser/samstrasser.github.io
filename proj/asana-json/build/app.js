var MainApp = React.createClass({displayName: "MainApp",
  getInitialState: function() { 
    return { 
      activeView: 'basic',
      sections: [],
      tags: []
    };
  },
  
  handleNav: function(dest) {
    this.setState({
      activeView: dest
    });
  },
  
  handleFilter: function() {
    
  },

  handleDataChanged: function(data) {
    this.setState(data);
  },
  
  render: function() {
    var sections = this.state.sections;
    var tags = this.state.tags;
    var viewBasic = this.state.activeView === 'basic';
    var ActiveView = viewBasic ? SectionViewBasic : SectionViewFunnels;
    return (
      React.createElement("div", null, 
        sections.length > 0 &&
          React.createElement(AppNav, {
            sections: sections, handleNav: this.handleNav, 
            tags: tags, handleFilter: this.handleFilter}
            ), 
        
        React.createElement("div", {className: "main"}, 
          React.createElement(InputArea, {handleDataChanged: this.handleDataChanged}), 
          
          React.createElement(ActiveView, {sections: sections})
        )
      
      
      )
    );
  }
  
});

// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(function() {
  React.render(
    React.createElement(MainApp, null),
    document.getElementById('content')
  );
// });

