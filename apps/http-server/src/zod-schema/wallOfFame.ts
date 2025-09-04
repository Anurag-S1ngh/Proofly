import { z } from "zod";

export const createWallOfFameSchema = z.object({
  inWallOfFame: z.boolean({
    required_error: "Please select if you want to add to the wall of fame",
    invalid_type_error: "Please select if you want to add to the wall of fame",
  }),
});
