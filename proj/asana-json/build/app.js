var MainApp = React.createClass({displayName: "MainApp",
  getInitialState: function() { 
    return { 
      tasks: [ ] 
    };
  },
  
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
  
  handleDataChanged: function(data) {
    this.setState({ 
      tasks: data
    });
  },

  render: function() {
    var sections = this.tasksBySection(this.state.tasks);
    return (
      React.createElement("div", null, 
        React.createElement(InputArea, {handleDataChanged: this.handleDataChanged}), 

        sections.length > 0 && React.createElement(DownloadLink, {sections: sections}), 
        
        sections.map(function(section) {
          return (
            React.createElement(TaskSection, {
              key: section.id, 
              name: section.name, 
              tasks: section.tasks}
              )
            
          )
        })
      )
    )
  }
});

var TaskSection = React.createClass({displayName: "TaskSection",
  getInitialState: function() {
    return { expanded: false }
  },
  
  handleClick: function() {
    this.setState({ expanded: !this.state.expanded })
  },
  
  render: function() {
    return (
      React.createElement("div", {className: "section", onClick: this.handleClick}, 
        React.createElement("h5", null, this.props.name, " (", this.props.tasks.length, ")"), 
        this.state.expanded && 
          React.createElement("ul", null, 
            this.props.tasks.map(function(task) {
              return (
                React.createElement(Task, {
                  key: task.id, 
                  task: task}
                  )
              )
            })
          )
        
      )
    );
  }
});

var Task = React.createClass({displayName: "Task",
  render: function() {
    var task = this.props.task;
    return (
      React.createElement("li", {key: task.id}, task.name)
    )
  }
});

var DownloadLink = React.createClass({displayName: "DownloadLink",
  generateRows: function(sections) {
    var rows = ['Funnel Step,Task,'];
    sections.forEach(function(section) {
      section.tasks.forEach(function(task) {
        var row = [section.name, task.name].map(function(item) { 
          return '"' + item + '"';
        });
        rows.push(row.join(','));
      })
    });
    return rows;
  },
  
  render: function() {
    var rows = this.generateRows(this.props.sections);
    var encoded = btoa(rows.join("\n"));
    var href = "data:text/csv;base64," + encoded;

    return (
      React.createElement("a", {download: "tasks.csv", href: href, className: "download", title: "Download as CSV"}, 
        React.createElement("img", {src: "img/excel.png"}), " Download"
      )
    );
  }
});

var InputArea = React.createClass({displayName: "InputArea",
  getInitialState: function() {
    return { inputExpanded: true };
  },
  
  handleBlur: function(e) {
    var raw = e.target.value;
    var data;
    try {
      data = JSON.parse(raw);
    } catch (e) { }
    if (data != undefined) {
      this.props.handleDataChanged(data);
    }
    
    this.setState({
      inputExpanded: false
    });
  },
  
  handleFocus: function(e) {
    e.target.select();
    this.setState({
      inputExpanded: true
    });
  },
  
  render: function() {
    return (
      React.createElement("textarea", {
        placeholder: "Copy and paste JSON here", 
        onBlur: this.handleBlur, 
        onFocus: this.handleFocus, 
        rows: this.state.inputExpanded ? 10 : 1, 
        defaultValue: JSON.stringify(devData.data)
        })
      
    );
  }
});
    
React.render(
  React.createElement(MainApp, null),
  document.getElementById('content')
);
