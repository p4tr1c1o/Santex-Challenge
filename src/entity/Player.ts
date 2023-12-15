/* eslint-disable indent */
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from "typeorm"
import Team from "./Team"

@Entity()
@Unique(["name"])
class Player {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	name: string

	@Column({ nullable: true })
	position: string

	@Column({ nullable: true })
	dateOfBirth: string

	@Column({ nullable: true })
	nationality: string

	@ManyToOne(() => Team, (team) => team.squad)
	team: Team

	public constructor(init?: Partial<Player>) {
		Object.assign(this, init)
	}
}


export default Player
