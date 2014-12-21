var MainApp = React.createClass({displayName: "MainApp",
  render: function() {
    return (
      React.createElement("b", null, "Ready, set, ")
    );
  }
});
React.render(
  React.createElement(MainApp, null),
  document.getElementById('content')
);