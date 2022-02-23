import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm'
import { randomUUID } from 'crypto'
import { Paste } from './Paste'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @BeforeInsert()
  addId() {
    this.id = randomUUID()
  }

  @Column({ type: 'varchar', nullable: false, unique: true })
  username!: string

  @Column({ type: 'varchar' })
  salt!: string

  @Column({ type: 'varchar' })
  password!: string

  @CreateDateColumn()
  createdAt!: Date

  @OneToMany(() => Paste, paste => paste.user)
  pastes!: Paste[]
}
