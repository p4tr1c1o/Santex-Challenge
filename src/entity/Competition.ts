/* eslint-disable indent */
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToMany } from "typeorm"
import Team from "./Team"

@Entity()
@Unique(["name"])
class Competition {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ nullable: true })
	code: string

	@Column({ nullable: true })
	areaName: string

	@ManyToMany(() => Team, team => team.competitions)
	teams: Team[]

	public constructor(init?: Partial<Competition>) {
		Object.assign(this, init)
	}
}


export default Competition
