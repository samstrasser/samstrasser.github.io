var MainApp = React.createClass({displayName: "MainApp",
  getInitialState: function() { 
    return { 
      activeView: 'funnels',
      sections: [] 
    };
  },
  
  handleNav: function(dest) {
    this.setState({
      activeView: dest
    });
  },

  handleDataChanged: function(data) {
    this.setState({ 
      sections: data
    });
  },
  
  render: function() {
    var sections = this.state.sections;
    var viewBasic = this.state.activeView === 'basic';
    var ActiveView = viewBasic ? SectionViewBasic : SectionViewFunnels;
    return (
      React.createElement("div", null, 
        React.createElement(AppNav, {sections: sections, handleNav: this.handleNav}), 
        
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

