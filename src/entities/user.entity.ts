import { Gender, Role } from 'src/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'role', default: Role.USER })
  role: string;

  @Column({ name: 'nick_name', type: 'varchar', nullable: true })
  nickName: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'account', type: 'text', nullable: true })
  account: string;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password: string;

  @Column({ name: 'avatar_image', type: 'varchar', nullable: true })
  avatarImage: string;

  @Column({ name: 'background_image', type: 'varchar', nullable: true })
  backgroundImage: string;

  @Column({ name: 'birth_day', type: 'date', nullable: true })
  birthDay: Date;

  @Column({ name: 'gender', default: Gender.OTHER })
  gender: string;

  @Column({ name: 'sologan', type: 'text', nullable: true })
  slogan: string;

  @Column('smallint', {
    name: 'provider_type',
    nullable: true,
    comment: '1: local, 2: google, 3: facebook',
  })
  providerType: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
