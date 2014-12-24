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
    var sections = this.state.sections;
    return (
      <div>
        <InputArea handleDataChanged={this.handleDataChanged} />
        
        <SectionViewFunnels sections={sections} />
        
        {/* <SectionViewBasic sections={this.state.sections} /> */}
        
        {sections.length > 0 && <DownloadLink sections={sections} />}
      
      
      </div>
    );
  }
  
});
    
React.render(
  <MainApp />,
  document.getElementById('content')
);
