import React, { Component } from "react";

class Person extends Component {
  state = {
    name: this.props.name,
    data: this.props.data
  };
  render() {
    //console.log(this.props.data);
    let winner = "";
    let ouScore, oppScore;
    if (this.props.team) {
      ouScore = this.state.data[this.props.team.name].ou;
      oppScore = this.state.data[this.props.team.name].opp;
      if (ouScore === oppScore) winner = "tie";
      if (ouScore > oppScore) winner = "ou-win";
      if (ouScore < oppScore) winner = "opp-win";
    }
    return (
      <div className={(this.props.data.winning ? "winning " : "") + "person"}>
        {this.state.name}-{this.props.data.points}
        {this.props.team && (
          <div className={"team-score " + winner}>
            {ouScore}-{oppScore}
          </div>
        )}
        {this.props.team &&
          this.state.data[this.props.team.name].points > 0 && (
            <div>{this.state.data[this.props.team.name].points}</div>
          )}
      </div>
    );
  }
}

export default Person;
