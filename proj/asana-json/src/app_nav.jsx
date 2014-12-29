var AppNav = React.createClass({
  render: function() {
    var sections = this.props.sections;
    var tags = this.props.tags;
    var handleNav = this.props.handleNav;
    var handleFilter = this.props.handleFilter;

    return (
      <div className="nav">
        <button className="btn btn-default" 
          onClick={handleNav.bind(null, 'basic')}>Lists</button>
        <button className="btn btn-default" 
          onClick={handleNav.bind(null, 'funnels')}>Graph</button>
        
        <DownloadLink sections={sections} />

        <hr />
        
      {/* 
        Filters

        {Object.keys(tags).map(function(k){
          var tag = tags[k];
          var classes = 'btn btn-default';
          if (tag.active) {
            classes += ' active';
          }
          return (
            <button className={classes} key={tag.id}
              onClick={handleFilter.bind(null, tag)}>{tag.name}</button>
          )
        })}
      */}
      </div>
    )
  }
});