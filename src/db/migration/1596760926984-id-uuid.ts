import {MigrationInterface, QueryRunner} from "typeorm";

export class idUuid1596760926984 implements MigrationInterface {
    name = 'idUuid1596760926984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "FK_47bf6007bfde3928fc923ee3d51"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "PK_920331560282b8bd21bb02290df"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "PK_c528fc87b92c80b06e44399c66c"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "PK_b5d3ffb9a81999715eaa4fe07bc" PRIMARY KEY ("group_id")`);
        await queryRunner.query(`DROP INDEX "IDX_47bf6007bfde3928fc923ee3d5"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP COLUMN "permission_id"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD "permission_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "PK_b5d3ffb9a81999715eaa4fe07bc"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "PK_c528fc87b92c80b06e44399c66c" PRIMARY KEY ("group_id", "permission_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_47bf6007bfde3928fc923ee3d5" ON "groups_permissions" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "FK_47bf6007bfde3928fc923ee3d51" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "FK_47bf6007bfde3928fc923ee3d51"`);
        await queryRunner.query(`DROP INDEX "IDX_47bf6007bfde3928fc923ee3d5"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "PK_c528fc87b92c80b06e44399c66c"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "PK_b5d3ffb9a81999715eaa4fe07bc" PRIMARY KEY ("group_id")`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP COLUMN "permission_id"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD "permission_id" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_47bf6007bfde3928fc923ee3d5" ON "groups_permissions" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "PK_b5d3ffb9a81999715eaa4fe07bc"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "PK_c528fc87b92c80b06e44399c66c" PRIMARY KEY ("permission_id", "group_id")`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "PK_920331560282b8bd21bb02290df"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "FK_47bf6007bfde3928fc923ee3d51" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

}
