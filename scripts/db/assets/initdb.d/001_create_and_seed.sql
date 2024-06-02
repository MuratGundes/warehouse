create user warehouse with nosuperuser encrypted password 'postgres';
create database warehouse with owner = warehouse;

--\connect warehouse

-- create table product
-- (
--     "id"            text NOT NULL constraint "PK_Product" primary key,
--     "name"          text NOT NULL,
--     "unit"          integer NOT NULL,
--     "isHazardous"   boolean NOT NULL,
--     "created_at"    bigint NOT NULL
-- );
--
-- alter table product
--     owner to warehouse;
--
-- BEGIN;
-- INSERT INTO product ("id", "name", "unit", "isHazardous", "created_at") VALUES ('da52fed5-3bea-4c14-87fd-65fc8c0e0931', 'TestProduct1', 1, true, 1620000000001);
-- INSERT INTO product ("id", "name", "unit", "isHazardous", "created_at") VALUES ('7213db28-0908-4f80-af2d-5b4c4585ee69', 'TestProduct2', 2, false, 1620000000002);
-- INSERT INTO product ("id", "name", "unit", "isHazardous", "created_at") VALUES ('132a18ab-5885-49f2-9d32-86a290344a3e', 'TestProduct3', 3, true, 1620000000003);
-- INSERT INTO product ("id", "name", "unit", "isHazardous", "created_at") VALUES ('206bf36c-5b18-4601-aa51-7b35718d831a', 'TestProduct4', 4, false, 1620000000004);
-- INSERT INTO product ("id", "name", "unit", "isHazardous", "created_at") VALUES ('3d3180cd-4c48-49a1-85f0-30d6d37e82bf', 'TestProduct5', 5, true, 1620000000005);
-- COMMIT;