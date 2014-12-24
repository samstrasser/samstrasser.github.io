var SectionViewBasic = React.createClass({displayName: "SectionViewBasic",
  
  render: function() {
    var sections = this.props.sections;
    return (
      React.createElement("div", null, 
        sections.length > 0 && React.createElement(DownloadLink, {sections: sections}), 
    
        sections.map(function(section) {
          return (
            React.createElement(TaskSection, {
            key: section.id, 
            name: section.name, 
            tasks: section.tasks}
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
    return (
      React.createElement("div", {className: "section", onClick: this.handleClick}, 
      React.createElement("h5", null, this.props.name, " (", this.props.tasks.length, ")"), 
    this.state.expanded && 
      React.createElement("ul", null, 
    this.props.tasks.map(function(task) {
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