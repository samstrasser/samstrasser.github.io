var App = React.createClass({
  render: function() {
    return (
      <div>Hello, app</div>
    );
  }
});


React.render(
  <App />,
  document.getElementById('content')
);
