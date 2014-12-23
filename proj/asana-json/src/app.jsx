var MainApp = React.createClass({
  getInitialState: function() { 
    return { 
      rawData: { data: [ ] }
    };
  },
  
  tasksBySection: function(rawData) {
    var sections = [];
    var currSection = {};
    rawData.data.filter(function(task) {
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
      rawData: data
    });
  },

  render: function() {
    var sections = this.tasksBySection(this.state.rawData);
    return (
      <div>
        <InputArea handleDataChanged={this.handleDataChanged} />

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

var DownloadLink = React.createClass({
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
      <a download="tasks.csv" href={href} className="download" title="Download as CSV">
        <img src="img/excel.png" /> Download
      </a>
    );
  }
});

var InputArea = React.createClass({
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
    var val = '';
    if (typeof devData != 'undefined') {
      val = JSON.stringify(devData);
    }
    return (
      <textarea 
        placeholder="Copy and paste JSON here"
        onBlur={this.handleBlur} 
        onFocus={this.handleFocus}
        rows={this.state.inputExpanded ? 10 : 1}
        defaultValue={val}
        ></textarea>
      
    );
  }
});
    
React.render(
  <MainApp />,
  document.getElementById('content')
);
