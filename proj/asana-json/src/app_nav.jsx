var AppNav = React.createClass({
  render: function() {
    var sections = this.props.sections;
    var tags = [];
    for (tag in this.props.tags) {
      tags.push(this.props.tags[tag]);
    }
    var handleNav = this.props.handleNav;
    return (
      <div className="nav">
        <button onClick={handleNav.bind(null, 'basic')}>Lists</button>
        <button onClick={handleNav.bind(null, 'funnels')}>Graph</button>
        
        <DownloadLink sections={sections} />

        <hr />
        
        <ol>
          {tags.map(function(tag){
            return <li>{tag}</li>;
          })}
        </ol>
      </div>
    )
  }
});