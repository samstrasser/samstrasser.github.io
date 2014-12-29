var SectionViewBasic = React.createClass({displayName: "SectionViewBasic",
  
  render: function() {
    var sections = this.props.sections;
    var tags = this.props.tags;
    return (
      React.createElement("div", null, 
        sections.map(function(section) {
          return (
            React.createElement(TaskSection, {
              key: section.id, 
              name: section.name, 
              tasks: section.tasks, 
              tags: tags}
              )
          )
        })
      )
    )
  }
});

var TaskSection = React.createClass({displayName: "TaskSection",
  getInitialState: function() {
    return { expanded: false }
  },
  
  handleClick: function() {
    this.setState({ expanded: !this.state.expanded })
  },
  
  render: function() {
    var tags = this.props.tags;
    var tasks = this.props.tasks;
    
    var shouldFilter = Object.keys(tags).some(function(key) {
      return tags[key].active;
    });
    
    if (shouldFilter) {
      tasks = tasks.filter(function(task) {
        return task.tags.some(function(tag){
          console.log(task.name, tag.name, tag.active);
          return tags[tag.id].active === true
        });
      });
    }
    
    
    return (
      React.createElement("div", {className: "section", onClick: this.handleClick}, 
      React.createElement("div", null, this.props.name, " ", React.createElement("span", {className: "badge"}, tasks.length)), 
        this.state.expanded && 
          React.createElement("ul", null, 
            tasks.map(function(task) {
              return (
                React.createElement(Task, {
                  key: task.id, 
                  task: task}
                  )
              )
            })
          )
        
      )
    );
  }
});

var Task = React.createClass({displayName: "Task",
  render: function() {
    var task = this.props.task;
    return (
      React.createElement("li", {key: task.id}, task.name)
    )
  }
});