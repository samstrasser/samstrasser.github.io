var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello Wufoo</h1>
        <FileInput />
      </div>
    );
  }
});


React.render(
  <App />,
  document.getElementById('content')
);
