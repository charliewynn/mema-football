import React, { Component } from "react";
import Person from "./Person";
import "./People.css";

class People extends Component {
  state = {
    people: this.props.people
  };
  render() {
    const names = Object.getOwnPropertyNames(this.state.people);
    return (
      <div className="people">
        {names
          .sort(
            (a, b) => this.state.people[b].points - this.state.people[a].points
          )
          .map(n => (
            <Person
              key={n}
              name={n}
              team={this.props.team}
              data={this.state.people[n]}
            />
          ))}
      </div>
    );
  }
}

export default People;
