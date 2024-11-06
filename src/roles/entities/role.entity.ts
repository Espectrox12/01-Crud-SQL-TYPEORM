import { User } from "src/users/entities/user.entity";
import{Column, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rol: string;

    @OneToMany(() => User, (user) => user.role)
    user: User[];
}