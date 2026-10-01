'use client';

import {
  MOCK_ATTENDANCE_RECORDS,
  MOCK_APP_SETTINGS,
  MOCK_CAREER_RECORDS,
  MOCK_COMPANY_LOANS,
  MOCK_COMPANY_TRANSACTIONS,
  MOCK_POCKET_TRANSACTIONS,
  MOCK_PROFILE,
  MOCK_SALARY_SETTINGS,
  MOCK_SAVINGS_GOALS,
} from '@/lib/mock-data';
import { translate, type TranslationKey } from '@/lib/i18n/translations';

export function useCurrentAppRecords() {
  return {
    records: {
      profile: MOCK_PROFILE,
      salarySettings: MOCK_SALARY_SETTINGS,
      appSettings: MOCK_APP_SETTINGS,
    },
    isLoading: false,
    isOnboarded: true,
  };
}

export function useAttendanceRecords(month: string) {
  const records = MOCK_ATTENDANCE_RECORDS.filter((r) => r.date.startsWith(month));
  return { records, isLoading: false };
}

export function useAllAttendanceRecords() {
  return { records: MOCK_ATTENDANCE_RECORDS, isLoading: false };
}

export function useCareerRecords() {
  return { records: MOCK_CAREER_RECORDS, isLoading: false };
}

export function useCompanyTransactions() {
  return { transactions: MOCK_COMPANY_TRANSACTIONS, isLoading: false };
}

export function useCompanyLoans() {
  return { loans: MOCK_COMPANY_LOANS, isLoading: false };
}

export function usePocketRecords() {
  return {
    transactions: MOCK_POCKET_TRANSACTIONS,
    goals: MOCK_SAVINGS_GOALS,
    isLoading: false,
  };
}

export function useSecuritySettings() {
  return { settings: null, isLoading: false };
}

export function useAppTranslation() {
  const language = MOCK_APP_SETTINGS.language;
  return {
    language,
    isRtl: false,
    t: (key: TranslationKey) => translate(language, key),
  };
}
