var SectionViewFunnels = React.createClass({displayName: "SectionViewFunnels",
  componentDidUpdate: function() {
    var sections = this.props.sections;
    var headers = ['Section', 'Num Tasks'];
    var rows = sections.map(function(section) {
      return [section.name, section.tasks.length];
    });
    var data = [headers].concat(rows);
    var dataTable = google.visualization.arrayToDataTable(data);
      
    var options = {
      title: 'Funnel Steps',
      legend: { position: 'none' },
    };
    
    var elt = this.getDOMNode();
    var chart = new google.visualization.ColumnChart(elt);
      
    chart.draw(dataTable, options);
  },
  
  render: function() {
    return React.createElement("div", {className: "chart"}, "Chart")
  }
});
