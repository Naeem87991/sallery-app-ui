'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AppIcon } from '@/components/ui/app-icon';
import { calculateCurrentRoleEarnings, getCareerLifetimeEarnings, getEstimatedMonthlySalary } from '@/lib/calculations/career-earnings';
import { getCompanyBalance } from '@/lib/calculations/company-balance';
import { getPocketBalance } from '@/lib/calculations/pocket-balance';
import { formatCurrency } from '@/lib/formatting/currency';
import { formatDate } from '@/lib/formatting/date';
import { useAllAttendanceRecords } from '@/hooks/use-mock-data';
import { useCareerRecords } from '@/hooks/use-mock-data';
import { useCompanyTransactions } from '@/hooks/use-mock-data';
import { useCurrentAppRecords } from '@/hooks/use-mock-data';
import { useAppTranslation } from '@/hooks/use-mock-data';
import { usePocketRecords } from '@/hooks/use-mock-data';
import type {
  AppLanguage,
  AttendanceRecord,
  CareerRecord,
  CompanyTransaction,
  PocketTransaction,
  SavingsGoal,
  UserProfile,
} from '@/types/domain';

// Local type replacing lib/reports/local-exports
type LocalReportData = {
  profile: UserProfile;
  attendance: AttendanceRecord[];
  companyTransactions: CompanyTransaction[];
  pocketTransactions: PocketTransaction[];
  savingsGoals: SavingsGoal[];
  careerRecords: CareerRecord[];
  companyBalance: number;
  pocketBalance: number;
  generatedOn: string;
  lifetimeEarnings: number;
};

const transactionLabelsUr: Record<string, string> = {
  credit: 'کمپنی کریڈٹ',
  withdrawal: 'نکلوائی گئی رقم',
  voucher: 'واؤچر',
  advance: 'پیشگی رقم',
  loan: 'قرض جاری',
  'loan-repayment': 'قرض واپسی',
  deduction: 'کٹوتی',
};

export function ReportsContent() {
  const { t } = useAppTranslation();
  const { records: appRecords, isLoading, isOnboarded } = useCurrentAppRecords();
  const { records: attendance, isLoading: attendanceLoading } = useAllAttendanceRecords();
  const { transactions: companyTransactions, isLoading: companyLoading } = useCompanyTransactions();
  const { transactions: pocketTransactions, goals: savingsGoals, isLoading: pocketLoading } = usePocketRecords();
  const { records: careerRecords, isLoading: careerLoading } = useCareerRecords();
  const [voucherId, setVoucherId] = useState('');
  const [status, setStatus] = useState('');
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);

  const profile = appRecords?.profile;
  const salarySettings = appRecords?.salarySettings;
  const language = appRecords?.appSettings?.language;
  const isUrdu = language === 'ur';

  const reportTemplate = useMemo<Omit<LocalReportData, 'generatedOn' | 'lifetimeEarnings'> | null>(() => profile ? ({ profile, attendance, companyTransactions, pocketTransactions, savingsGoals, careerRecords, companyBalance: getCompanyBalance(companyTransactions), pocketBalance: getPocketBalance(pocketTransactions) }) : null, [attendance, careerRecords, companyTransactions, pocketTransactions, profile, savingsGoals]);
  const selectedVoucher = companyTransactions.find((transaction) => transaction.id === voucherId) ?? companyTransactions[0];

  if (isLoading || attendanceLoading || companyLoading || pocketLoading || careerLoading) return <section className="dashboard-loading" aria-live="polite">{t('loadingReports')}</section>;
  if (!isOnboarded || !profile || !salarySettings || !reportTemplate) return <SetupRequired />;

  const exportCsv = () => {
    window.alert('Export available in the full version.');
    setStatus(isUrdu ? 'ایکسپورٹ مکمل ورژن میں دستیاب ہے۔' : 'Export available in the full version.');
  };
  const exportPdf = async () => {
    setIsPreparingPdf(true); setStatus('');
    window.alert('Export available in the full version.');
    setStatus(isUrdu ? 'ایکسپورٹ مکمل ورژن میں دستیاب ہے۔' : 'Export available in the full version.');
    setIsPreparingPdf(false);
  };
  const exportVoucher = () => {
    if (!selectedVoucher) { setStatus(isUrdu ? 'واؤچر امیج بنانے سے پہلے کمپنی کا اندراج شامل کریں۔' : 'Add a company entry before making a voucher image.'); return; }
    window.alert('Export available in the full version.');
    setStatus(isUrdu ? 'ایکسپورٹ مکمل ورژن میں دستیاب ہے۔' : 'Export available in the full version.');
  };

  return (
    <section className="reports-page">
      <header className="page-heading"><div><p className="eyebrow">{isUrdu ? 'مقامی رپورٹس' : 'LOCAL REPORTS'}</p><h1>{isUrdu ? 'اپنے ریکارڈ ساتھ لے جائیں۔' : 'Take your records with you.'}</h1><p className="page-subtitle">{isUrdu ? 'ایکسپورٹس اسی ڈیوائس کے ریکارڈ سے آپ کے براؤزر میں بنتی ہیں۔ کچھ سرور پر نہیں جاتا۔' : 'Exports are prepared in your browser from this device\'s records. Nothing is sent to a server.'}</p></div></header>
      <section className="reports-overview">
        <ReportMetric label={isUrdu ? 'کمپنی بیلنس' : 'Company balance'} value={formatCurrency(reportTemplate.companyBalance)} language={language} />
        <ReportMetric label={isUrdu ? 'ذاتی رقم' : 'Personal pocket'} value={formatCurrency(reportTemplate.pocketBalance)} language={language} />
        <ReportMetric label={isUrdu ? 'محفوظ شدہ ریکارڈز' : 'Saved records'} value={String(attendance.length + companyTransactions.length + pocketTransactions.length + careerRecords.length)} language={language} />
      </section>
      <section className="report-export-grid">
        <article className="report-export-card"><span className="report-icon"><AppIcon name="file" aria-hidden="true" size={24} /></span><p className="eyebrow">{isUrdu ? 'اسپریڈ شیٹ تیار' : 'SPREADSHEET READY'}</p><h2>{isUrdu ? 'CSV رپورٹ' : 'CSV report'}</h2><p>{isUrdu ? 'کمپنی، ذاتی رقم، کیریئر اور بچت کے ریکارڈز اسپریڈ شیٹ فائل میں ڈاؤن لوڈ کریں۔' : 'Download company, pocket, career, and savings records in a spreadsheet-friendly CSV file.'}</p><button className="primary-button" type="button" onClick={exportCsv}>{isUrdu ? 'CSV ڈاؤن لوڈ کریں' : 'Download CSV'} <AppIcon name="arrow-right" aria-hidden="true" size={17} /></button></article>
        <article className="report-export-card report-export-emphasis"><span className="report-icon"><AppIcon name="file" aria-hidden="true" size={24} /></span><p className="eyebrow">{isUrdu ? 'پرنٹ ایبل خلاصہ' : 'PRINTABLE SUMMARY'}</p><h2>{isUrdu ? 'PDF رپورٹ' : 'PDF report'}</h2><p>{isUrdu ? 'بیلنس، حاضری اور حالیہ مقامی سرگرمیوں کا ایک صفحے پر مشتمل صاف ستھرا خلاصہ حاصل کریں۔' : 'Get a clean one-page snapshot of balances, attendance, and recent local activity.'}</p><button className="primary-button" type="button" onClick={exportPdf} disabled={isPreparingPdf}>{isPreparingPdf ? (isUrdu ? 'تیار ہو رہا ہے…' : 'Preparing…') : (isUrdu ? 'PDF ڈاؤن لوڈ کریں' : 'Download PDF')} <AppIcon name="arrow-right" aria-hidden="true" size={17} /></button></article>
        <article className="report-export-card"><span className="report-icon"><AppIcon name="building" aria-hidden="true" size={24} /></span><p className="eyebrow">{isUrdu ? 'واؤچر امیج' : 'VOUCHER IMAGE'}</p><h2>{isUrdu ? 'پرنٹ ایبل واؤچر' : 'Printable voucher'}</h2><p>{isUrdu ? 'کمپنی اندراج منتخب کریں اور واضح تصویر محفوظ کریں جسے پرنٹ یا شیئر کیا جا سکے۔' : 'Choose a company entry and save a crisp SVG image that can be printed or shared.'}</p><label className="field"><span>{isUrdu ? 'کمپنی کا اندراج' : 'Company entry'}</span><select value={selectedVoucher?.id ?? ''} onChange={(event) => setVoucherId(event.target.value)} disabled={!companyTransactions.length}><option value="">{companyTransactions.length ? (isUrdu ? 'سب سے حالیہ اندراج' : 'Most recent entry') : (isUrdu ? 'ابھی کمپنی کا کوئی اندراج نہیں' : 'No company entries yet')}</option>{companyTransactions.map((transaction) => <option key={transaction.id} value={transaction.id}>{formatDate(transaction.occurredOn)} · {isUrdu ? (transactionLabelsUr[transaction.type] ?? transaction.type) : transaction.type} · {formatCurrency(transaction.amount)}</option>)}</select></label><button className="secondary-button" type="button" onClick={exportVoucher} disabled={!companyTransactions.length}>{isUrdu ? 'واؤچر ڈاؤن لوڈ کریں' : 'Download voucher'}</button></article>
      </section>
      <p className="report-status" role="status">{status}</p>
      <section className="report-contents"><div><p className="eyebrow">{isUrdu ? 'PDF میں شامل' : 'INCLUDED IN PDF'}</p><h2>{isUrdu ? 'واضح، مقامی اور مفید۔' : 'Clear, local, useful.'}</h2></div><ul><li>{isUrdu ? 'موجودہ کمپنی اور ذاتی بیلنس' : 'Current company and personal balances'}</li><li>{isUrdu ? 'حاضری، کیریئر اور بچت کی تعداد' : 'Attendance, career, and savings counts'}</li><li>{isUrdu ? 'کمپنی اور ذاتی رقم کے پانچ حالیہ اندراجات' : 'Five most recent company and pocket entries'}</li><li>{isUrdu ? 'چار تک سیونگ گولز کی پیشرفت کا خلاصہ' : 'Up to four savings-goal progress summaries'}</li></ul></section>
    </section>
  );
}

function ReportMetric({ label, value, language }: { label: string; value: string; language?: AppLanguage }) { return <article><span>{label}</span><strong>{value}</strong><small>{language === 'ur' ? 'مقامی ریکارڈ سے' : 'from local records'}</small></article>; }

function SetupRequired() { return <section className="feature-placeholder"><span className="placeholder-icon"><AppIcon name="file" aria-hidden="true" size={28} /></span><p className="eyebrow">LOCAL REPORTS</p><h1>Set up your workspace first.</h1><p>Reports use the private records created after local salary setup.</p><Link className="primary-button" href="/onboarding">Start setup <AppIcon name="arrow-right" aria-hidden="true" size={17} /></Link></section>; }
