var MainApp = React.createClass({
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
      <div>
        <AppNav sections={sections} handleNav={this.handleNav}/>
        
        <div className="main">
        
          <InputArea handleDataChanged={this.handleDataChanged} />
          
          <ActiveView sections={sections} />
        </div>
      
      
      </div>
    );
  }
  
});

// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(function() {
  React.render(
    <MainApp />,
    document.getElementById('content')
  );
// });

