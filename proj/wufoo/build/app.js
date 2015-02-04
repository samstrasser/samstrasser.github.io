var App = React.createClass({displayName: "App",
  handleData: function(csv) {
    console.log(csv);
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(FileInput, {
          handleData: this.handleData})
      )
    );
  }
});


React.render(
  React.createElement(App, null),
  document.getElementById('content')
);
