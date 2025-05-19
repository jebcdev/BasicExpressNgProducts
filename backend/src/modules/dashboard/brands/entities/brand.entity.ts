import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity("brands")
export class BrandEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        length: 255,
        nullable: false,
        unique: true,
    })
    slug: string;

    @Column({
        length: 255,
        nullable: false,
    })
    description: string;

    @Column({
        length: 255,
        nullable: false,
    })
    image: string;

    @OneToMany(() => ProductEntity, (product) => product.brand)
    products: ProductEntity[];

    @CreateDateColumn({
        type: "timestamp",
        nullable: false,
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        nullable: false,
    })
    updated_at: Date;

    @DeleteDateColumn({
        type: "timestamp",
        nullable: true,
    })
    deleted_at: Date;
}
