import { z } from 'zod';

export const cardDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  columnId: z.string(),
  assignedTo: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});
