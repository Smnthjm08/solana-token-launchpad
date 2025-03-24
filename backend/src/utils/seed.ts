// this file needs to be moved to prisma
import {
  PrismaClient,
  ChallengeStatus,
  ChallengeVisibility,
  VerificationMethod,
  ParticipantStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding users...");

  const users = await prisma.user.createMany({
    data: Array.from({ length: 20 }, (_, i) => ({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: "securepassword123",
    })),
    skipDuplicates: true,
  });
  console.log("===", users);

  const allUsers = await prisma.user.findMany();

  console.log("Seeding challenges...");

  // Seed Challenges
  const challengesData = Array.from({ length: 5 }, (_, i) => ({
    name: `Step Challenge ${i + 1}`,
    description: `Walk ${5000 + i * 1000} steps daily!`,
    duration: 7, // 7 days
    goalSteps: 5000 + i * 1000,
    numParticipants: 0,
    prizeMoney: 100.0,
    entryAmount: 10.0,
    status: ChallengeStatus.IN_PROGRESS,
    featured: i === 0, // First challenge is featured
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
    visibility: ChallengeVisibility.PUBLIC,
    verificationMethod: VerificationMethod.GOOGLE_FIT,
    createdBy: allUsers[i % allUsers.length].id, // Assign creator
  }));

  await prisma.challenge.createMany({ data: challengesData });

  const allChallenges = await prisma.challenge.findMany();

  console.log("Seeding participants...");

  // Seed Challenge Participants
  for (const challenge of allChallenges) {
    const participants = allUsers
      .sort(() => Math.random() - 0.5) // Shuffle users
      .slice(0, 10) // Pick 10 users per challenge
      .map((user) => ({
        userId: user.id,
        challengeId: challenge.id,
        progress: Math.floor(Math.random() * challenge.goalSteps), // Random progress
        status: ParticipantStatus.ACTIVE,
        joinedAt: new Date(),
      }));

    await prisma.challengeParticipant.createMany({ data: participants });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
