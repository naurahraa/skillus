import { PrismaClient } from "@prisma/client";

function createPrismaClient() {
  const client = new PrismaClient();

  return client.$extends({
    query: {
      async $allOperations({ args, query }) {
        const maxRetries = 2;
        let lastError: unknown;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
          try {
            return await query(args);
          } catch (error) {
            lastError = error;

            const isConnectionError =
              error instanceof Error &&
              (error.message.includes("Can't reach database server") ||
                error.message.includes("P1001"));

            if (isConnectionError && attempt < maxRetries) {
              // Database Neon kemungkinan lagi "bangun" dari idle (auto-suspend di paket gratis).
              // Tunggu sebentar, makin lama tiap percobaan, terus coba lagi.
              await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
              continue;
            }

            throw error;
          }
        }

        throw lastError;
      },
    },
  });
}

type PrismaClientExtended = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientExtended | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}