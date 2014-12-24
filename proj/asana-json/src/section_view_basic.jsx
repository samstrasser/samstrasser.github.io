var SectionViewBasic = React.createClass({
  
  render: function() {
    var sections = this.props.sections;
    return (
      <div>
        {sections.length > 0 && <DownloadLink sections={sections} />}
    
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