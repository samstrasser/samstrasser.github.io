var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Hello Wufoo"), 
        React.createElement(FileInput, null)
      )
    );
  }
});


React.render(
  React.createElement(App, null),
  document.getElementById('content')
);
