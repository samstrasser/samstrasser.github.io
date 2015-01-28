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
            <li contentEditable="true" className={classes}>{task.name}</li>
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
