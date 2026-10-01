'use client';

import type { AppLanguage, SecuritySettings } from '@/types/domain';

export function AppLockScreen({ securitySettings, language }: { securitySettings: SecuritySettings; language?: AppLanguage }) {
  void securitySettings;
  void language;
  return null; // Lock screen not applicable in the demo — no PIN is set.
}
