-- Create Enums if not exist
DO $$ BEGIN
    CREATE TYPE "LeadStage" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'CONVERTED', 'LOST', 'NURTURING');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "InvestmentGoal" AS ENUM ('INCOME', 'PRESERVATION', 'GROWTH', 'HYBRID');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    "userId" UUID REFERENCES users(id),
    email TEXT,
    phone TEXT,
    name TEXT,
    capital DECIMAL(15, 2),
    "investmentGoal" "InvestmentGoal",
    "experienceLevel" "ExperienceLevel",
    "creditInterest" BOOLEAN DEFAULT false,
    "qualificationScore" INTEGER DEFAULT 0,
    "leadStage" "LeadStage" DEFAULT 'NEW'::"LeadStage",
    "leadSource" TEXT,
    "leadMedium" TEXT,
    "leadCampaign" TEXT,
    "assignedTo" TEXT,
    "assignedAt" TIMESTAMP(3),
    "couponCode" TEXT,
    "couponUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "lastContactAt" TIMESTAMP(3),
    "convertedAt" TIMESTAMP(3)
);

-- Properties Table (Basic structure if missing)
CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    title TEXT,
    status TEXT,
    price DECIMAL(15, 2),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);
