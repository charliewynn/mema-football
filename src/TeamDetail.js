import React, { Component } from "react";
class TeamDetail extends Component {
  render() {
    const team = this.props.team;
    let result = "OU and " + team.name + " tied!";
    if (team.ou > team.opp) {
      result = `OU beat ${team.name}`;
    }
    if (team.ou < team.opp) {
      result = `OU lost to ${team.name}`;
    }
    const score = `${team.ou}-${team.opp}`;
    return (
      <div className="team-detail">
        <h1>{team.name}</h1>
        {team.ou ? (
          <div className="team-result">
            <div>{result}</div>
            <div className={team.winner + " team-score"}>{score}</div>
          </div>
        ) : (
          <div>Be sure to watch the game on {team.date}</div>
        )}
      </div>
    );
  }
}

export default TeamDetail;
