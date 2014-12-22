var MainApp = React.createClass({displayName: "MainApp",
  tasksBySection: function(tasks) {
    var sections = [];
    var currSection = {};
    tasks.filter(function(task) {
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
      }
    })
    
    return sections;
  },
  
  render: function() {
    var sections = this.tasksBySection(this.props.tasks);
    return (
      React.createElement("div", null, 
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
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h5", null, this.props.name), 
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
    
React.render(
  React.createElement(MainApp, {tasks: devData.data}),
  document.getElementById('content')
);
