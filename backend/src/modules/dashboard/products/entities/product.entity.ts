import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { CategoryEntity } from "../../categories/entities/category.entity";
import { BrandEntity } from "../../brands/entities/brand.entity";

export enum ProductStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}

@Entity("products")
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    code: string;

    @Column({ length: 150, unique: true })
    name: string;

    @Column({ length: 180, unique: true })
    slug: string;

    @Column("text")
    description: string;

    @Column({ length: 255, nullable: true })
    short_description: string;

    @Column({ type: "text", nullable: true, array: true })
    images: string[];

    @Column("numeric", { precision: 10, scale: 2 })
    price: number;

    @Column("numeric", { precision: 10, scale: 2, nullable: true })
    sale_price: number;

    @Column("numeric", { precision: 10, scale: 2, nullable: true })
    cost_price: number;

    @Column("int")
    stock_quantity: number;

    @Column({ length: 100, nullable: true })
    sku: string;

    @Column({ length: 100, nullable: true })
    barcode: string;

    @Column({ default: false })
    featured: boolean;

    @Column({
        type: "enum",
        enum: ProductStatus,
        default: ProductStatus.DRAFT,
    })
    status: ProductStatus;

    @Column()
    category_id: number;

    @Column()
    brand_id: number;

    @Column({ type: "text", nullable: true, array: true })
    tags: string[];

    @Column({ type: "text", nullable: true, array: true })
    attributes: string[];

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category: CategoryEntity;

    @ManyToOne(() => BrandEntity, (brand) => brand.products, {
        nullable: true,
    })
    @JoinColumn({ name: "brand_id" })
    brand: BrandEntity;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;
}
