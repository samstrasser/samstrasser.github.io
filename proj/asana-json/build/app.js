var MainApp = React.createClass({displayName: "MainApp",
  getInitialState: function() { 
    return { sections: [] };
  },

  handleDataChanged: function(data) {
    this.setState({ 
      sections: data
    });
  },
  
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(InputArea, {handleDataChanged: this.handleDataChanged}), 
        
        React.createElement(SectionViewBasic, {sections: this.state.sections})
      )
    );
  }
  
});
    
React.render(
  React.createElement(MainApp, null),
  document.getElementById('content')
);
