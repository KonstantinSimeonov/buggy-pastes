import { JoinColumn, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, ManyToOne } from 'typeorm'
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

  @Column({ type: 'varchar', length: 30 })
  public title!: string | null

  @Column({ type: 'varchar', length: 20 })
  public language!: string | null

  @Column({ type: 'text' })
  public content!: string

  @CreateDateColumn()
  public createdAt!: Date

  @Column({ type: 'uuid' })
  public userId!: string | null

  @ManyToOne(() => User, user => user.pastes, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user!: User | null;
}
