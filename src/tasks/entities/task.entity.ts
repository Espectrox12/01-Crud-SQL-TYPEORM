
import { User } from "src/users/entities/user.entity";
import{Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Task {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nametask: string;

    @Column()
    statustasks:string;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User, (user) => user.task, {
        eager:true,//para que traiga los usuarios al hacer un findone
    })
    user: User;
}
