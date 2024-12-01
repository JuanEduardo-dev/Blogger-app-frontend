-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT,
    "mail" TEXT NOT NULL,
    "password" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "degreeId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degree" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "degree_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_mail_key" ON "user"("mail");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "degree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
