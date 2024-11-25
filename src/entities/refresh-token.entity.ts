import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'token', type: 'varchar', nullable: false })
  token: string;

  @Column({ name: 'user_id', type: 'bigint', nullable: false })
  userId: number;

  @Column({ name: 'expires_date', type: 'timestamp', nullable: false })
  expiresDate: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
