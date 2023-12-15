/* eslint-disable indent */
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToMany, JoinTable, OneToMany, JoinColumn, OneToOne } from "typeorm"
import Competition from "./Competition"
import Coach from "./Coach"
import Player from "./Player"

@Entity()
@Unique(["name"])
class Team {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ nullable: true })
	shortName: string

	@Column({ nullable: true })
	tla: string

	@Column({ nullable: true })
	areaName: string

	@Column({ nullable: true })
	address: string

	@OneToOne(() => Coach, { eager: true })
	@JoinColumn()
	coach?: Coach

	@OneToMany(() => Player, (player) => player.team)
	squad?: Player[]

	@ManyToMany(() => Competition, (competition) => competition.teams, { eager: true })
	@JoinTable()
	competitions: Competition[]

	public constructor(init?: Partial<Team>) {
		Object.assign(this, init)
	}
}

export default Team
