import { z } from 'zod';
export const TripRequestSchema = z.object({
  destination: z.string().trim().min(2).max(120),
  startDate: z.string().optional().default(''),
  endDate: z.string().optional().default(''),
  travelers: z.coerce.number().int().min(1).max(20),
  budget: z.string().trim().max(80).optional().default(''),
  travelStyle: z.string().trim().min(2).max(80),
  notes: z.string().trim().max(2000).optional().default(''),
  language: z.string().trim().min(2).max(20).optional().default('it'),
});
export type TripRequest = z.infer<typeof TripRequestSchema>;
