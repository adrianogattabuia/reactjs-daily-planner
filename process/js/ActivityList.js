var React = require('react');

var ActivityList = React.createClass({

  handleDelete: function() {
    this.props.onDelete(this.props.whichItem)
  },

  render: function() {
    return(
      <li className="activity-item media">
        <div className="media-left">
          <span className="glyphicon glyphicon-remove"></span></button>
        </div>
        <div className="activity-info media-body">
          <div className="activity-head">
            <span className="activity-name">{this.props.singleItem.activityName}</span>
            <span className="activity-date pull-right">{this.props.singleItem.activityDate}</span>
          </div>
          <div className="activity-notes">{this.props.singleItem.activityDetails}</div>
        </div>
      </li>
    ) // return
  } // render
}); //ActivityList

module.exports = ActivityList;
