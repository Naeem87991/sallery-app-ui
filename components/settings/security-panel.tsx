'use client';

import { AppIcon } from '@/components/ui/app-icon';

export function SecurityPanel({ displayName }: { displayName: string }) {
  void displayName;
  return (
    <div className="security-panel">
      <div className="security-state">
        <span className="security-state-icon"><AppIcon name="lock" aria-hidden="true" size={19} /></span>
        <div>
          <strong>PIN lock &amp; passkeys</strong>
          <small>Available in the full version. This demo has no local security lock.</small>
        </div>
      </div>
      <span className="backup-status" role="status" />
    </div>
  );
}
