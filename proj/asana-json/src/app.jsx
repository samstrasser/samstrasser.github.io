var MainApp = React.createClass({
  getInitialState: function() { 
    return { 
      activeView: 'funnels',
      sections: [],
      tags: {}
    };
  },
  
  handleNav: function(dest) {
    this.setState({
      activeView: dest
    });
  },
  
  handleFilter: function(tag) {
    var tags = this.state.tags;
    tags[tag.id].active = !tags[tag.id].active;
    this.setState({
      tags: tags
    })
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
          
          <ActiveView sections={sections} tags={tags} />
        </div>
      
      
      </div>
    );
  }
  
});

  React.render(
    <MainApp />,
    document.getElementById('content')
  );

