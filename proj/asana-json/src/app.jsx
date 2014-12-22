var MainApp = React.createClass({
  tasksBySection: function(tasks) {
    return tasks.filter(function(task) {
      return !task.completed && task.name != '';
    });
  },
  
  render: function() {
    var tasks = this.tasksBySection(this.props.tasks);
    return (
      <ul>
        {tasks.map(function(task) {
          var classes = task.name[task.name.length-1] == ':' ? 'section' : '';
          return (
            <li className={classes} key={task.id}>{task.name}</li>
          );
        })}
      </ul>
    )
  }
});
React.render(
  <MainApp tasks={devData.data} />,
  document.getElementById('content')
);
