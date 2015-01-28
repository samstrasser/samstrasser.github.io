var PrintApp = React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    };
  },

  handleDataChanged: function(data) {
    this.setState({tasks: data});
  },

  render: function() {
    return (
      <div className="main">
        <InputArea
          handleDataChanged={this.handleDataChanged}
          />

        <PrintableTasks tasks={this.state.tasks} />
      </div>
    );
  }

});

var PrintableTasks = React.createClass({
  render: function() {
    var tasks = this.props.tasks;
    return (
      <ol>
        {tasks.map(function(task) {
          console.log(task);
          var classes = 'printable ';
          if (task.name[task.name.length-1] == ':') {
            classes += 'section';
          } else {
            classes += 'task';
          }

          return (
            <li className={classes}>{task.name}</li>
          )
        })}
      </ol>
    )
  }
});

React.render(
  <PrintApp />,
  document.getElementById('content')
);
