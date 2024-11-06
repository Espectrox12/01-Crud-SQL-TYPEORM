import { IsEmail } from "class-validator";
import { Role } from "src/roles/entities/role.entity";
import { Task } from "src/tasks/entities/task.entity";
import{Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Role, (role) => role.user, {
        eager: true, // Carga el rol automáticamente al obtener el usuario
    })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => Task, (task) => task.user)
    task: Task[];
}
