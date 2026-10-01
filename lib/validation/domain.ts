import type { PocketCategory } from '@/types/domain';

export const pocketCategories: PocketCategory[] = [
  'income',
  'food',
  'transport',
  'bills',
  'shopping',
  'health',
  'education',
  'family',
  'entertainment',
  'other',
];

export const MAX_RECEIPT_DATA_URL_LENGTH = 1_400_000;
