-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'ACKNOWLEDGE', 'RESOLVED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "creator_id" UUID,
    "assignee_id" UUID,
    "status" "Status" NOT NULL DEFAULT E'NOT_STARTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "index_users_on_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "index_users_on_is_admin" ON "users"("is_admin");

-- CreateIndex
CREATE INDEX "index_users_on_created_at" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "index_users_on_updated_at" ON "users"("updated_at");

-- CreateIndex
CREATE INDEX "index_incident_on_name" ON "incident"("name");

-- CreateIndex
CREATE INDEX "index_incident_on_type" ON "incident"("type");

-- CreateIndex
CREATE INDEX "index_incident_on_creator_id" ON "incident"("creator_id");

-- CreateIndex
CREATE INDEX "index_incident_on_assignee_id" ON "incident"("assignee_id");

-- CreateIndex
CREATE INDEX "index_incident_on_status" ON "incident"("status");

-- CreateIndex
CREATE INDEX "index_incident_on_created_at" ON "incident"("created_at");

-- CreateIndex
CREATE INDEX "index_incident_on_updated_at" ON "incident"("updated_at");

-- AddForeignKey
ALTER TABLE "incident" ADD CONSTRAINT "incident_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
