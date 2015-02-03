var App = React.createClass({
  handleData: function(csv) {
    console.log(csv);
  },

  render: function() {
    return (
      <div>
        <h1>Hello Wufoo</h1>
        <FileInput handleData={this.handleData} />
      </div>
    );
  }
});


React.render(
  <App />,
  document.getElementById('content')
);
