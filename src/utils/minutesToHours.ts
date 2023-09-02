export const minutesToHours = (minutes: number): string => {
  if (isNaN(minutes) || minutes < 0) {
    throw new Error("Invalid input. Minutes must be a non-negative number.");
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:00`;
};
