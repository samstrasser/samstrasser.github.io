var PrintApp = React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    };
  },

  handleDataChanged: function(data) {
    this.setState({tasks: data});
  },

  handleChangedTitle: function(e) {
    document.title = e.target.innerHTML;
  },

  render: function() {
    return (
      <div className="main">
        <h1 contentEditable="true"
          onInput={this.handleChangedTitle}
          >Phase 2 Roadmap [or] Product Opportunities</h1>
        <InputArea
          handleDataChanged={this.handleDataChanged}
          />

        <PrintableTasks tasks={this.state.tasks} />
      </div>
    );
  }

});

var PrintableTasks = React.createClass({
  getInitialState: function() {
    return {
      hiddenTasks: {}
    };
  },

  handleDelete: function(taskId) {
    var hidden = this.state.hiddenTasks;
    hidden[taskId] = true;
    this.setState({
      hiddenTasks: hidden
    });
  },

  render: function() {
    var tasks = this.props.tasks;
    tasks = tasks.filter(function(task) {
      return this.state.hiddenTasks[task.id] !== true;
    }.bind(this));

    return (
      <ol>
        {tasks.map(function(task) {
          var classes = 'printable ';
          if (task.name[task.name.length-1] == ':') {
            classes += 'section';
          } else {
            classes += 'task';
          }

          return (
            <li key={task.id} contentEditable="true" className={classes}>
              {task.name} &nbsp;
              <button type="button" className="hidden-print close"
                onClick={this.handleDelete.bind(null, task.id)}
                >
                &times;</button>
            </li>
          )
        }.bind(this))}
      </ol>
    )
  }
});

React.render(
  <PrintApp />,
  document.getElementById('content')
);
