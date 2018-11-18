import React, { Component } from "react";

class Teams extends Component {
	teamPicked(team) {
		this.props.teamPicked(team);
	}
	render() {
		return (
			<div className="teams">
				{this.props.data.map(t => (
					<div
						onClick={() => this.teamPicked(t)}
						className={
							(t === this.props.team ? "picked " : "") +
							"team" +
							(t.inprogress ? " in-progress" : "")
						}
						key={t.name}
					>
						<div className="team-name">{t.name}</div>
						{t.ou !== undefined ? (
							<div className={t.winner + " team-score"}>
								{t.ou}-{t.opp}
							</div>
						) : (
							<div className="team-date">{t.date}</div>
						)}
					</div>
				))}
			</div>
		);
	}
}

export default Teams;
