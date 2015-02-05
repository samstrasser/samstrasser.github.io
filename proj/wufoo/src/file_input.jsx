var FileInput = React.createClass({
  handleFileSelect: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var file = files[0];

    var results = Papa.parse(file, {
      complete: function(results, f) {
        this.handleCSV(results);
      }
    });
  },

  handleCSV: function(string) {
    this.props.handleData(string);
  },

  handleDragOver: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    evt.dataTransfer.dropEffect = 'copy';
  },

  componentDidMount: function() {
    var dropZone = this.getDOMNode();

    dropZone.addEventListener('dragover', this.handleDragOver, false);
    dropZone.addEventListener('drop', this.handleFileSelect, false);
  },

  componentWillUnmount: function() {
    // TODO: should unsubscribe at some point
  },

  render: function() {
    var val = '';
    if (typeof devData != 'undefined') {
      this.handleCSV(devData);
    }
    return (
      <div className="dropTarget">Drop files here</div>
    );
  }

});
