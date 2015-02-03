var FileInput = React.createClass({
  handleFileSelect: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var file = files[0];
    window.dbgFile = file;
    var reader = new FileReader();

    reader.onload = function(e) {
      this.handleRawCSV(e.target.result);
    }
   reader.readAsText(file);
  },

  handleRawCSV: function(string) {

  },

  handleDragOver: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // Explicitly show this is a copy.
    evt.dataTransfer.dropEffect = 'copy';
  },

  componentDidMount: function() {
    var dropZone = this.getDOMNode();
    dropZone.addEventListener('dragover', this.handleDragOver, false);
    dropZone.addEventListener('drop', this.handleFileSelect, false);
  },

  render: function() {
    return (
      <div>Drop files here</div>
    );
  }

});
