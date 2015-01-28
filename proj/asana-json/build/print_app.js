var PrintApp = React.createClass({displayName: "PrintApp",
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
      React.createElement("div", {className: "main"}, 
        React.createElement("h1", {contentEditable: "true", 
          onInput: this.handleChangedTitle
          }, "Phase 2 Roadmap [or] Product Opportunities"), 
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
          var classes = 'printable ';
          if (task.name[task.name.length-1] == ':') {
            classes += 'section';
          } else {
            classes += 'task';
          }

          return (
            React.createElement("li", {key: task.id, contentEditable: "true", className: classes}, 
              task.name
            )
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
