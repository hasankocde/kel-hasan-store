CREATE TABLE "ad"(
    "id" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "categoryId" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(255) NULL,
    "addressId" BIGINT NOT NULL,
    "price" BIGINT NOT NULL,
    "image" JSON NULL,
    "offerType" BOOLEAN NOT NULL,
    "isPublish" BOOLEAN NOT NULL DEFAULT '1',
    "countOfVisitors" BIGINT NOT NULL,
    "expireDate" DATE NOT NULL,
    "soldUserId" BIGINT NOT NULL,
    "soldDate" DATE NOT NULL,
    "isReserved" BOOLEAN NOT NULL DEFAULT '0',
    "visitedUser" JSON NOT NULL,
    "future" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "ad" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "ad"."offerType" IS 'Seller or Buyer';
CREATE TABLE "follow"(
    "id" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "followUserId" BIGINT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "follow" ADD PRIMARY KEY("id");
CREATE TABLE "message"(
    "id" BIGINT NOT NULL,
    "adId" BIGINT NOT NULL,
    "senderUserId" BIGINT NOT NULL,
    "receiverUserId" BIGINT NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "message" ADD PRIMARY KEY("id");
CREATE TABLE "token"(
    "id" BIGINT NOT NULL,
    "token" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "token" ADD PRIMARY KEY("id");
CREATE INDEX "token_token_index" ON
    "token"("token");
CREATE INDEX "token_userid_index" ON
    "token"("userId");
CREATE TABLE "address"(
    "id" BIGINT NOT NULL,
    "userId" BIGINT NULL,
    "street" BIGINT NULL,
    "zipCode" BIGINT NOT NULL,
    "city" BIGINT NULL,
    "country" BIGINT NULL,
    "doorbellName" BIGINT NULL,
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT NOT NULL
);
ALTER TABLE
    "address" ADD PRIMARY KEY("id");
CREATE TABLE "favorite"(
    "id" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "adId" BIGINT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "favorite" ADD PRIMARY KEY("id");
CREATE TABLE "notification"(
    "id" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "notificationType" VARCHAR(255) NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "notification" ADD PRIMARY KEY("id");
CREATE TABLE "category"(
    "id" BIGINT NOT NULL,
    "topCategoryId" BIGINT NOT NULL,
    "categoriesId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "category" ADD PRIMARY KEY("id");
ALTER TABLE
    "category" ADD CONSTRAINT "category_name_unique" UNIQUE("name");
CREATE TABLE "user"(
    "id" BIGINT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "businessName" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255) NULL,
    "dateOfBirth" DATE NOT NULL,
    "tel" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT '1',
    "isBusiness" BOOLEAN NOT NULL DEFAULT '0',
    "isPremium" BOOLEAN NOT NULL DEFAULT '0',
    "taxNr" BIGINT NOT NULL,
    "userType" VARCHAR(255) CHECK
        (
            "userType" IN('staff - admin - user - ...')
        ) NOT NULL,
        "startDate" DATE NOT NULL,
        "endDate" DATE NOT NULL,
        "future" VARCHAR(255) NOT NULL,
        "createdAt" DATE NOT NULL,
        "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_username_unique" UNIQUE("userName");
ALTER TABLE
    "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");
CREATE INDEX "user_password_index" ON
    "user"("password");
ALTER TABLE
    "user" ADD CONSTRAINT "user_taxnr_unique" UNIQUE("taxNr");
ALTER TABLE
    "follow" ADD CONSTRAINT "follow_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "message" ADD CONSTRAINT "message_adid_foreign" FOREIGN KEY("adId") REFERENCES "ad"("id");
ALTER TABLE
    "message" ADD CONSTRAINT "message_receiveruserid_foreign" FOREIGN KEY("receiverUserId") REFERENCES "user"("id");
ALTER TABLE
    "address" ADD CONSTRAINT "address_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "ad" ADD CONSTRAINT "ad_categoryid_foreign" FOREIGN KEY("categoryId") REFERENCES "category"("id");
ALTER TABLE
    "favorite" ADD CONSTRAINT "favorite_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "message" ADD CONSTRAINT "message_senderuserid_foreign" FOREIGN KEY("senderUserId") REFERENCES "user"("id");
ALTER TABLE
    "favorite" ADD CONSTRAINT "favorite_adid_foreign" FOREIGN KEY("adId") REFERENCES "ad"("id");
ALTER TABLE
    "token" ADD CONSTRAINT "token_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "follow" ADD CONSTRAINT "follow_followuserid_foreign" FOREIGN KEY("followUserId") REFERENCES "user"("id");
ALTER TABLE
    "notification" ADD CONSTRAINT "notification_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "ad" ADD CONSTRAINT "ad_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "ad" ADD CONSTRAINT "ad_addressid_foreign" FOREIGN KEY("addressId") REFERENCES "address"("id");