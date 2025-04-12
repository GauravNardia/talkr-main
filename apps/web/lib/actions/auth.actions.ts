"use server";

import { prisma } from "@repo/db";
import { onboardingSchema } from "@repo/shared";
import { z } from "zod";

export async function OnboardUser(
  values: z.infer<typeof onboardingSchema>,
  userId: string,
) {
  try {
    const parsedValues = onboardingSchema.parse(values);

    const user = await prisma.user.upsert({
      where: { email: parsedValues.email },
      update: {
        username: parsedValues.username,
        native: parsedValues.native,
        target: parsedValues.target,
        onboarded: true,
      },
      create: {
        userId,
        email: parsedValues.email,
        username: parsedValues.username,
        native: parsedValues.native,
        target: parsedValues.target,
        onboarded: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error in OnboardUser:", error instanceof Error ? error.message : error);
    throw error;
  }
}
