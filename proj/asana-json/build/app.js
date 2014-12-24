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
    var sections = this.state.sections;
    return (
      React.createElement("div", null, 
        React.createElement(InputArea, {handleDataChanged: this.handleDataChanged}), 
        
        React.createElement(SectionViewFunnels, {sections: sections}), 
        
        /* <SectionViewBasic sections={this.state.sections} /> */
        
        sections.length > 0 && React.createElement(DownloadLink, {sections: sections})
      
      
      )
    );
  }
  
});

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {
  React.render(
    React.createElement(MainApp, null),
    document.getElementById('content')
  );
});

