// Mock data for sallery-app-ui public demo
// Monthly salary: 30,000 PKR
// Daily rate: 1,000 PKR (30,000 / 30)
// Shift: 9:00 AM – 5:00 PM (8 hours)
// Per-second rate: 1000 / (8 * 3600) ≈ 0.0000347 PKR/second
// Employee: M. Kamran, joined 2024-01-01

import type {
  AttendanceRecord,
  AppSettings,
  CareerRecord,
  CompanyLoan,
  CompanyTransaction,
  PocketTransaction,
  SavingsGoal,
  SalarySettings,
  UserProfile,
} from '@/types/domain';

export const MOCK_PROFILE: UserProfile = {
  id: 'current',
  firstName: 'M. Kamran',
  lastName: '',
  employeeId: 'EMP-001',
  designation: 'Senior Accountant',
  joiningDate: '2025-01-01',
  createdAt: '2024-01-01T09:00:00.000Z',
  updatedAt: '2024-01-01T09:00:00.000Z',
};

export const MOCK_SALARY_SETTINGS: SalarySettings = {
  id: 'current',
  salaryMode: 'fixed-monthly',
  baseSalary: 30000,
  dailyRate: 1000,
  salaryCalculationRule: '30-days',
  dutyStart: '09:00',
  dutyEnd: '17:00',
  shiftDurationHours: 8,
  weeklyOffDay: 0, // Sunday
  isWeeklyOffPaid: false,
  autoAttendanceRule: 'off',
  autoAttendanceTime: null,
  halfDayFactor: 0.5,
  currency: 'PKR',
  createdAt: '2024-01-01T09:00:00.000Z',
  updatedAt: '2024-01-01T09:00:00.000Z',
};

export const MOCK_APP_SETTINGS: AppSettings = {
  id: 'current',
  theme: 'dark',
  language: 'en',
  isPrivacyModeEnabled: false,
  lowCashThreshold: 2000,
  createdAt: '2024-01-01T09:00:00.000Z',
  updatedAt: '2024-01-01T09:00:00.000Z',
};

// September 2026 attendance
// Sundays (weekly-off): 6, 13, 20, 27
// Weekdays = Mon–Sat (26 days total)
// 2 absences: Sep 10, Sep 16
// 24 present days
const TS = '2026-09-01T09:00:00.000Z';
function makeAttRec(
  day: number,
  status: AttendanceRecord['status'],
  checkIn: string | null,
  checkOut: string | null,
): AttendanceRecord {
  const d = `2026-09-${String(day).padStart(2, '0')}`;
  return {
    id: `att-sep26-${day}`,
    date: d,
    status,
    checkIn,
    checkOut,
    overtimeMinutes: 0,
    note: '',
    createdAt: TS,
    updatedAt: TS,
  };
}

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  makeAttRec(1, 'present', '09:02', '17:03'),
  makeAttRec(2, 'present', '09:00', '17:01'),
  makeAttRec(3, 'present', '09:05', '17:00'),
  makeAttRec(4, 'present', '09:01', '17:02'),
  makeAttRec(5, 'present', '09:03', '17:04'),
  makeAttRec(6, 'weekly-off', null, null),
  makeAttRec(7, 'present', '09:00', '17:00'),
  makeAttRec(8, 'present', '09:02', '17:01'),
  makeAttRec(9, 'present', '09:04', '17:02'),
  makeAttRec(10, 'absent', null, null),
  makeAttRec(11, 'present', '09:01', '17:03'),
  makeAttRec(12, 'present', '09:00', '17:00'),
  makeAttRec(13, 'weekly-off', null, null),
  makeAttRec(14, 'present', '09:03', '17:01'),
  makeAttRec(15, 'present', '09:02', '17:00'),
  makeAttRec(16, 'absent', null, null),
  makeAttRec(17, 'present', '09:00', '17:02'),
  makeAttRec(18, 'present', '09:01', '17:05'),
  makeAttRec(19, 'present', '09:05', '17:00'),
  makeAttRec(20, 'weekly-off', null, null),
  makeAttRec(21, 'present', '09:00', '17:01'),
  makeAttRec(22, 'present', '09:02', '17:03'),
  makeAttRec(23, 'present', '09:01', '17:00'),
  makeAttRec(24, 'present', '09:03', '17:02'),
  makeAttRec(25, 'present', '09:00', '17:04'),
  makeAttRec(26, 'present', '09:04', '17:00'),
  makeAttRec(27, 'weekly-off', null, null),
  makeAttRec(28, 'present', '09:01', '17:01'),
  makeAttRec(29, 'present', '09:02', '17:03'),
  makeAttRec(30, 'present', '09:00', '17:00'),
];

export const MOCK_COMPANY_TRANSACTIONS: CompanyTransaction[] = [
  { id: 'ct-001', type: 'credit', amount: 10000, occurredOn: '2026-09-01', note: 'Partial salary credit', loanId: null, createdAt: TS, updatedAt: TS },
  { id: 'ct-002', type: 'advance', amount: 5000, occurredOn: '2026-09-05', note: 'Advance payment', loanId: null, createdAt: TS, updatedAt: TS },
  { id: 'ct-003', type: 'loan', amount: 10000, occurredOn: '2026-08-01', note: 'Salary advance loan', loanId: 'loan-001', createdAt: TS, updatedAt: TS },
  { id: 'ct-004', type: 'loan-repayment', amount: 5500, occurredOn: '2026-09-08', note: 'Loan repayment installment', loanId: 'loan-001', createdAt: TS, updatedAt: TS },
  { id: 'ct-005', type: 'credit', amount: 8500, occurredOn: '2026-09-10', note: 'Second salary credit', loanId: null, createdAt: TS, updatedAt: TS },
  { id: 'ct-006', type: 'withdrawal', amount: 3000, occurredOn: '2026-09-15', note: 'Cash withdrawal', loanId: null, createdAt: TS, updatedAt: TS },
  { id: 'ct-007', type: 'withdrawal', amount: 2000, occurredOn: '2026-09-20', note: 'Second withdrawal', loanId: null, createdAt: TS, updatedAt: TS },
  { id: 'ct-008', type: 'credit', amount: 6000, occurredOn: '2026-09-25', note: 'Third salary credit', loanId: null, createdAt: TS, updatedAt: TS },
];

export const MOCK_COMPANY_LOANS: CompanyLoan[] = [
  {
    id: 'loan-001',
    name: 'Salary Advance',
    principalAmount: 10000,
    issuedOn: '2026-08-01',
    note: 'Short-term salary advance',
    createdAt: TS,
    updatedAt: TS,
  },
];

export const MOCK_POCKET_TRANSACTIONS: PocketTransaction[] = [
  { id: 'pt-001', type: 'cash-in', amount: 8000, occurredOn: '2026-09-01', note: 'Opening balance', category: 'income', receiptDataUrl: null, savingsGoalId: null, reminderOn: null, createdAt: TS, updatedAt: TS },
  { id: 'pt-002', type: 'expense', amount: 300, occurredOn: '2026-09-03', note: 'Rickshaw fare', category: 'transport', receiptDataUrl: null, savingsGoalId: null, reminderOn: null, createdAt: TS, updatedAt: TS },
  { id: 'pt-003', type: 'expense', amount: 1200, occurredOn: '2026-09-07', note: 'Lunch & dinner', category: 'food', receiptDataUrl: null, savingsGoalId: null, reminderOn: null, createdAt: TS, updatedAt: TS },
  { id: 'pt-004', type: 'expense', amount: 800, occurredOn: '2026-09-11', note: 'Utility bills', category: 'bills', receiptDataUrl: null, savingsGoalId: null, reminderOn: null, createdAt: TS, updatedAt: TS },
  { id: 'pt-005', type: 'expense', amount: 1500, occurredOn: '2026-09-15', note: 'Monthly shopping', category: 'shopping', receiptDataUrl: null, savingsGoalId: null, reminderOn: null, createdAt: TS, updatedAt: TS },
  { id: 'pt-006', type: 'expense', amount: 500, occurredOn: '2026-09-19', note: 'Clinic visit', category: 'health', receiptDataUrl: null, savingsGoalId: null, reminderOn: null, createdAt: TS, updatedAt: TS },
  { id: 'pt-007', type: 'expense', amount: 500, occurredOn: '2026-09-22', note: 'Miscellaneous', category: 'other', receiptDataUrl: null, savingsGoalId: null, reminderOn: null, createdAt: TS, updatedAt: TS },
];
// Balance: 8000 - (300+1200+800+1500+500+500) = 8000 - 4800 = 3200 ✓

export const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'goal-001',
    name: 'Emergency Fund',
    targetAmount: 50000,
    savedAmount: 12500,
    targetDate: '2027-06-01',
    note: 'Build 6-month safety net',
    createdAt: TS,
    updatedAt: TS,
  },
];

export const MOCK_CAREER_RECORDS: CareerRecord[] = [
  {
    id: 'career-001',
    companyName: 'Al-Noor Trading',
    designation: 'Accounts Officer',
    startDate: '2020-01-01',
    endDate: '2021-05-31',
    monthlySalary: 18000,
    note: 'First professional role',
    createdAt: TS,
    updatedAt: TS,
  },
  {
    id: 'career-002',
    companyName: 'TechCorp Solutions',
    designation: 'Junior Accountant',
    startDate: '2021-06-01',
    endDate: '2024-12-31',
    monthlySalary: 22000,
    note: 'Promoted to senior role at new company',
    createdAt: TS,
    updatedAt: TS,
  },
];
