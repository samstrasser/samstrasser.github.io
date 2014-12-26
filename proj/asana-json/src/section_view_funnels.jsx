var SectionViewFunnels = React.createClass({
  getInitialState: function() {
    return { googleLibLoaded: false }
  },
  
  render: function() {
    return (
      <div className="chart">
        {!this.state.googleLibLoaded && 
          <div>
            "Loading chart library..."
          </div>
        }
      </div>
    )
  },

  componentDidMount: function() {
    // We're in the DOM so start setting up Google vis library
    this.loadGoogleVis();
  },
  
  componentDidUpdate: function() {
    var sections = this.props.sections;

    if (!this.state.googleLibLoaded || sections.length === 0) {
      return;
    }

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
  
  
  loadGoogleVis: function() {
    // If google didn't load into the global namespace (e.g. we're offline), 
    // don't try to load the visualization library
    if (typeof google === 'undefined') return;
    google.load("visualization", "1", {
      packages:["corechart"],
      callback: function() {
        // this will be called immediately if the library has already loaded
        this.setState({
          googleLibLoaded: true
        });
      }.bind(this)
    
    });
  }
});
