/* eslint-disable indent */
import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["name"])
class Coach {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	name: string

	@Column({ nullable: true })
	dateOfBirth: string

	@Column({ nullable: true })
	nationality: string

	public constructor(init?: Partial<Coach>) {
		Object.assign(this, init)
	}
}


export default Coach
