var MainApp = React.createClass({displayName: "MainApp",
  tasksBySection: function(tasks) {
    return tasks.filter(function(task) {
      return !task.completed && task.name != '';
    });
  },
  
  render: function() {
    var tasks = this.tasksBySection(this.props.tasks);
    return (
      React.createElement("ul", null, 
        tasks.map(function(task) {
          var classes = task.name[task.name.length-1] == ':' ? 'section' : '';
          return (
            React.createElement("li", {className: classes, key: task.id}, task.name)
          );
        })
      )
    )
  }
});
React.render(
  React.createElement(MainApp, {tasks: devData.data}),
  document.getElementById('content')
);
