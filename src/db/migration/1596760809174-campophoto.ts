import {MigrationInterface, QueryRunner} from "typeorm";

export class campophoto1596760809174 implements MigrationInterface {
    name = 'campophoto1596760809174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photo" SET NOT NULL`);
    }

}
