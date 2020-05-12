import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitMigration implements MigrationInterface {
  name = 'init1589240325579'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `address` (`id` int NOT NULL AUTO_INCREMENT, `latitude` decimal(10,8) NOT NULL, `longitude` decimal(11,8) NOT NULL, `title` varchar(255) NOT NULL, `details` text NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    )
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    )
    await queryRunner.query(
      'CREATE TABLE `vendor` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    )
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `price` decimal(10,2) NOT NULL, `vendorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    )
    await queryRunner.query(
      'CREATE TABLE `product_to_order` (`id` int NOT NULL AUTO_INCREMENT, `quantity` int NOT NULL, `orderId` int NULL, `productId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    )
    await queryRunner.query(
      'CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `total` decimal(10,2) NOT NULL, `startTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deliveryTime` datetime NULL, `addressId` int NULL, `carrierId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    )
    await queryRunner.query(
      'CREATE TABLE `carrier` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `address` ADD CONSTRAINT `FK_d25f1ea79e282cc8a42bd616aa3` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `product` ADD CONSTRAINT `FK_921582066aa70b502e78ea92012` FOREIGN KEY (`vendorId`) REFERENCES `vendor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `product_to_order` ADD CONSTRAINT `FK_37a14f7472c66e24dd48688869a` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `product_to_order` ADD CONSTRAINT `FK_9a4a5afa8072e977f6cf5751dd8` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_73f9a47e41912876446d047d015` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_3180b06102e839c44f77f7358cb` FOREIGN KEY (`carrierId`) REFERENCES `carrier`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_3180b06102e839c44f77f7358cb`',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_73f9a47e41912876446d047d015`',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `product_to_order` DROP FOREIGN KEY `FK_9a4a5afa8072e977f6cf5751dd8`',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `product_to_order` DROP FOREIGN KEY `FK_37a14f7472c66e24dd48688869a`',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `product` DROP FOREIGN KEY `FK_921582066aa70b502e78ea92012`',
      undefined,
    )
    await queryRunner.query(
      'ALTER TABLE `address` DROP FOREIGN KEY `FK_d25f1ea79e282cc8a42bd616aa3`',
      undefined,
    )
    await queryRunner.query('DROP TABLE `carrier`', undefined)
    await queryRunner.query('DROP TABLE `order`', undefined)
    await queryRunner.query('DROP TABLE `product_to_order`', undefined)
    await queryRunner.query('DROP TABLE `product`', undefined)
    await queryRunner.query('DROP TABLE `vendor`', undefined)
    await queryRunner.query('DROP TABLE `user`', undefined)
    await queryRunner.query('DROP TABLE `address`', undefined)
  }
}
