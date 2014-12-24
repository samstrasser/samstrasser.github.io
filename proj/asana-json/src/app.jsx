var MainApp = React.createClass({
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
      <div>
        <InputArea handleDataChanged={this.handleDataChanged} />
        
        <SectionViewBasic sections={this.state.sections} />
      </div>
    );
  }
  
});
    
React.render(
  <MainApp />,
  document.getElementById('content')
);
