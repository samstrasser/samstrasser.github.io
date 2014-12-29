var SectionViewBasic = React.createClass({
  
  render: function() {
    var sections = this.props.sections;
    var tags = this.props.tags;
    return (
      <div>
        {sections.map(function(section) {
          return (
            <TaskSection 
              key={section.id}
              name={section.name} 
              tasks={section.tasks} 
              tags={tags}
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
      <div className="section" onClick={this.handleClick}>
      <div>{this.props.name} <span className="badge">{tasks.length}</span></div>
        {this.state.expanded && 
          <ul>
            {tasks.map(function(task) {
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