var PrintApp = React.createClass({displayName: "PrintApp",
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
      React.createElement("div", {className: "main"}, 
        React.createElement(InputArea, {
          handleDataChanged: this.handleDataChanged}
          ), 

        React.createElement(PrintableTasks, {tasks: this.state.tasks})
      )
    );
  }

});

var PrintableTasks = React.createClass({displayName: "PrintableTasks",
  render: function() {
    var tasks = this.props.tasks;
    return (
      React.createElement("ol", null, 
        tasks.map(function(task) {
          console.log(task);
          var classes = 'printable ';
          if (task.name[task.name.length-1] == ':') {
            classes += 'section';
          } else {
            classes += 'task';
          }

          return (
            React.createElement("li", {className: classes}, task.name)
          )
        })
      )
    )
  }
});

React.render(
  React.createElement(PrintApp, null),
  document.getElementById('content')
);
