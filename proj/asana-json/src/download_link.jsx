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
      <a className="btn btn-default download" 
        download="tasks.csv" 
        href={href} 
        title="Download as CSV"
        >
      <img src="img/excel.png" /> Download
      </a>
    );
  }
});