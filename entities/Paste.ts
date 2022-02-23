import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, ManyToOne } from 'typeorm'
import { randomUUID } from 'crypto'
import { User } from './User'

@Entity()
export class Paste {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @BeforeInsert()
  addId() {
    this.id = randomUUID()
  }

  @Column({ type: 'varchar' })
  public content!: string

  @CreateDateColumn()
  public createdAt!: Date

  @ManyToOne(() => User, user => user.pastes, { nullable: true })
  user!: User | null;
}
