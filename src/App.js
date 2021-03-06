import React, { Component } from "react";
import People from "./People";
import Teams from "./Teams";
import TeamDetail from "./TeamDetail";
import "./App.css";
import PlayerData from "./PlayerData";
import TeamData from "./TeamData";

class App extends Component {
	constructor(props) {
		super(props);
		for (let p in PlayerData) {
			PlayerData[p].points = 0;
		}

		for (let t of TeamData) {
			if (t.ou === t.opp) {
				t.winner = "tie";
			}
			if (t.ou > t.opp) {
				t.winner = "ou-win";
			}
			if (t.ou < t.opp) {
				t.winner = "opp-win";
			}
			if (t.ou === undefined) continue;
			let bestOU = 1000;
			let bestOPP = 1000;
			for (let p in PlayerData) {
				const player = PlayerData[p];
				const game = player[t.name];
				game.points = 0;
				if (game.ou === game.opp && t.ou === t.opp) {
					game.points++;
				}
				if (game.ou > game.opp && t.ou > t.opp) {
					game.points++;
				}
				if (game.ou < game.opp && t.ou < t.opp) {
					game.points++;
				}
				if (game.points) {
					const OUdiff = Math.abs(t.ou - PlayerData[p][t.name].ou);
					if (OUdiff < bestOU) {
						bestOU = OUdiff;
					}
					const OPPdiff = Math.abs(t.opp - PlayerData[p][t.name].opp);
					if (OPPdiff < bestOPP) {
						bestOPP = OPPdiff;
					}
				}
			}
			t.winners = {};
			for (let p2 in PlayerData) {
				const player = PlayerData[p2];
				const game = player[t.name];

				if (game.points) {
					if (Math.abs(t.ou - game.ou) === bestOU) {
						game.points++;
					}
					if (Math.abs(t.opp - game.opp) === bestOPP) {
						game.points++;
					}
				}
				for (var i = 1; i < game.points; i++)
					t.winners[p2] = (t.winners[p2] || 0) + 1;
				player.points += game.points;
			}
			//console.log(t, winners);
		}
		let mostPoints = 0;
		for (let p2 in PlayerData) {
			const player = PlayerData[p2];
			if (player.points > mostPoints) mostPoints = player.points;
		}
		for (let p2 in PlayerData) {
			const player = PlayerData[p2];
			if (player.points === mostPoints) player.winning = true;
		}
		let currentTeam = TeamData.filter(t => t.focus);
		if (currentTeam.length) {
			currentTeam = currentTeam[0];
		} else {
			currentTeam = undefined;
		}

		this.state = {
			playerData: PlayerData,
			teamData: TeamData,
			team: currentTeam
		};
	}
	teamPicked(team) {
		this.setState({ team: team });
	}
	render() {
		return (
			<div className="App">
				<Teams
					team={this.state.team}
					data={this.state.teamData}
					teamPicked={team => this.teamPicked(team)}
				/>
				{this.state.team && <TeamDetail team={this.state.team} />}
				<People people={this.state.playerData} team={this.state.team} />
			</div>
		);
	}
}

export default App;
