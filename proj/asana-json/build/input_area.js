var InputArea = React.createClass({displayName: "InputArea",
  getInitialState: function() {
    return { inputExpanded: true };
  },

  activeTasks: function(rawData) {
    return rawData.data.filter(function(task) {
      // Completely ignore empty or completed
      return !task.completed && task.name != '';
    })
  },

  handleBlur: function(e) {
    var raw = e.target.value;
    var data;
    try {
      data = JSON.parse(raw);
    } catch (e) { }
    if (data != undefined) {
      data = this.activeTasks(data);
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
      React.createElement("textarea", {
        placeholder: "Copy and paste JSON here", 
        onBlur: this.handleBlur, 
        onFocus: this.handleFocus, 
        rows: this.state.inputExpanded ? 10 : 1, 
        defaultValue: val, 
        className: "hidden-print"
        }
      )

    );
  }
});
