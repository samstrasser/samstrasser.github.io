var InputArea = React.createClass({
  getInitialState: function() {
    return { inputExpanded: true };
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
  
  handleBlur: function(e) {
    var raw = e.target.value;
    var data;
    try {
      data = JSON.parse(raw);
    } catch (e) { }
    if (data != undefined) {
      data = this.tasksBySection(data);
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
        >
      </textarea>
      
    );
  }
});