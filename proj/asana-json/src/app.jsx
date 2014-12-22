var MainApp = React.createClass({
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
      <div>
        {sections.map(function(section) {
          return (
            <TaskSection 
              key={section.id}
              name={section.name} 
              tasks={section.tasks} 
              />
            
          )
        })}
      </div>
    )
  }
});

var TaskSection = React.createClass({
  getInitialState: function() {
    return { expanded: false }
  },
  
  handleClick: function() {
    this.setState({ expanded: !this.state.expanded })
  },
  
  render: function() {
    return (
      <div className="section" onClick={this.handleClick}>
        <h5>{this.props.name} ({this.props.tasks.length})</h5>
        {this.state.expanded && 
          <ul>
            {this.props.tasks.map(function(task) {
              return (
                <Task
                  key={task.id}
                  task={task}
                  />
              )
            })}
          </ul>
        }
      </div>
    );
  }
});

var Task = React.createClass({
  render: function() {
    var task = this.props.task;
    return (
      <li key={task.id}>{task.name}</li>
    )
  }
});
    
React.render(
  <MainApp tasks={devData.data} />,
  document.getElementById('content')
);
