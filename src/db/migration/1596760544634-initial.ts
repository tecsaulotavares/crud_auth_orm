import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1596760544634 implements MigrationInterface {
    name = 'initial1596760544634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "e_mail" character varying NOT NULL, "password" character varying NOT NULL, "birth" TIMESTAMP NOT NULL, "photo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "groupId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups_permissions" ("permission_id" integer NOT NULL, "group_id" uuid NOT NULL, CONSTRAINT "PK_c528fc87b92c80b06e44399c66c" PRIMARY KEY ("permission_id", "group_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47bf6007bfde3928fc923ee3d5" ON "groups_permissions" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5d3ffb9a81999715eaa4fe07b" ON "groups_permissions" ("group_id") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "FK_47bf6007bfde3928fc923ee3d51" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" ADD CONSTRAINT "FK_b5d3ffb9a81999715eaa4fe07bc" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "FK_b5d3ffb9a81999715eaa4fe07bc"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions" DROP CONSTRAINT "FK_47bf6007bfde3928fc923ee3d51"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051"`);
        await queryRunner.query(`DROP INDEX "IDX_b5d3ffb9a81999715eaa4fe07b"`);
        await queryRunner.query(`DROP INDEX "IDX_47bf6007bfde3928fc923ee3d5"`);
        await queryRunner.query(`DROP TABLE "groups_permissions"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
