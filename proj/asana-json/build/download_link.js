var DownloadLink = React.createClass({displayName: "DownloadLink",
  generateRows: function(sections) {
    var rows = ['Funnel Step,Task,Tags,'];
    sections.forEach(function(section) {
      section.tasks.forEach(function(task) {
        var row = [section.name, task.name].map(function(item) {
          return '"' + item + '"';
        }).concat(task.tags.map(function(t) { return t.name; }).join(';'));
        rows.push(row.join(','));
      })
    });
    return rows;
  },

  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
  b64EncodeUnicode: function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
  },

  render: function() {
    var rows = this.generateRows(this.props.sections);
    var encoded = this.b64EncodeUnicode(rows.join("\n"));
    var href = "data:text/csv;base64," + encoded;

    return (
      React.createElement("a", {className: "btn btn-default download", 
        download: "tasks.csv", 
        href: href, 
        title: "Download as CSV"
        }, 
      React.createElement("img", {src: "img/excel.png"}), " Download"
      )
    );
  }
});
