import { differenceInDays } from 'date-fns';

export type BiorhythmValues = {
  physical: number;
  emotional: number;
  intellectual: number;
  perceptual: number;
};

/**
 * Calculates biorhythm values for a given birth date and target date.
 * @param birthDate - The user's date of birth.
 * @param targetDate - The date for which to calculate the biorhythms.
 * @returns An object containing physical, emotional, intellectual, and perceptual biorhythm values.
 */
export const calculateBiorhythm = (birthDate: Date, targetDate: Date): BiorhythmValues => {
  const daysSinceBirth = differenceInDays(targetDate, birthDate);

  return {
    physical: Math.sin((2 * Math.PI * daysSinceBirth) / 23),
    emotional: Math.sin((2 * Math.PI * daysSinceBirth) / 28),
    intellectual: Math.sin((2 * Math.PI * daysSinceBirth) / 33),
    perceptual: Math.sin((2 * Math.PI * daysSinceBirth) / 38),
  };
};
