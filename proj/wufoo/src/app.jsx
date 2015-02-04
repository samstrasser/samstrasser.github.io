var App = React.createClass({
  handleData: function(csv) {
    console.log(csv);
  },

  render: function() {
    return (
      <div>
        <FileInput
          handleData={this.handleData} />
      </div>
    );
  }
});


React.render(
  <App />,
  document.getElementById('content')
);
