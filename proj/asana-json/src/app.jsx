var MainApp = React.createClass({
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
      <div>
        {sections.length > 0 &&
          <AppNav 
            sections={sections} handleNav={this.handleNav}
            tags={tags} handleFilter={this.handleFilter}
            />}
        
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

