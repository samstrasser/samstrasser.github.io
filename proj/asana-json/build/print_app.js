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
  getInitialState: function() {
    return {
      hiddenTasks: {},
      newPagesTasks: {}
    };
  },

  toggleNewPage: function(taskId) {
    var newPages = this.state.newPagesTasks;
    newPages[taskId] = newPages[taskId] !== true;
    this.setState({
      newPagesTasks: newPages
    });

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
      React.createElement("ol", null, 
        tasks.map(function(task) {
          var classes = 'printable ';
          if (task.name[task.name.length-1] == ':') {
            classes += 'section';
          } else {
            classes += 'task';
          }

          var newPage = this.state.newPagesTasks[task.id] === true;
          if (newPage) {
            classes += ' new-page';
          }


          return (
            React.createElement("li", {key: task.id, contentEditable: "true", className: classes}, 
              task.name, "  ", 
              React.createElement("button", {type: "button", className: "hidden-print close", 
                onClick: this.handleDelete.bind(null, task.id)
                }, 
                "×"), 
              React.createElement("button", {type: "button", className: "hidden-print close", 
                onClick: this.toggleNewPage.bind(null, task.id)
                }, 
                "p")
            )
          )
        }.bind(this))
      )
    )
  }
});

React.render(
  React.createElement(PrintApp, null),
  document.getElementById('content')
);
