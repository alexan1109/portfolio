import { formatDistance as fDistance } from "date-fns";
import { nb } from "date-fns/locale";

export function formatDistance(createdAt: Date): string {
  return fDistance(createdAt, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: nb,
  });
}
