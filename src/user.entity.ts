import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity() export default class User { 
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column() 
    email: string;
    
    @Column() 
    password: string; 

    @Column() 
    profilePictureUrl: string; 

    @Column() 
    registrationDate: Date; 
}