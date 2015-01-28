var MainApp = React.createClass({displayName: "MainApp",
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

  tasksBySection: function(data) {
    var tags = {};
    var sections = [];
    var currSection = {};
    data.filter(function(task) {
      // Completely ignore empty or completed
      return !task.completed && task.name != '';
    }).forEach(function(task) {
      if (task.name[task.name.length-1] == ':') {
        // this is a section label
        if (currSection.name) sections.push(currSection);
        currSection = {
          id: task.id,
          name: task.name,
          tasks: []
        };
      } else {
        // this is a regular task
        currSection.tasks.push(task);
        task.tags.forEach(function(tag) {
          tags[tag.id] = tag;
        });
      }
    });
    // TODO: write this like a real engineer
    sections.push(currSection);


    return {
      sections: sections,
      tags: tags
    };
  },

  handleDataChanged: function(data) {
    this.setState(this.tasksBySection(data));
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

          React.createElement(ActiveView, {sections: sections, tags: tags})
        )


      )
    );
  }

});

  React.render(
    React.createElement(MainApp, null),
    document.getElementById('content')
  );
