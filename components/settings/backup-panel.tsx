'use client';

import { AppIcon } from '@/components/ui/app-icon';

export function BackupPanel() {
  return (
    <div className="backup-panel">
      <div className="backup-grid">
        <section className="backup-card">
          <span className="security-state-icon"><AppIcon name="file" aria-hidden="true" size={19} /></span>
          <p className="eyebrow">ENCRYPTED BACKUP</p>
          <h3>Available in the full version.</h3>
          <p>The full version includes AES-256 encrypted backup and restore of all local finance records.</p>
          <button className="primary-button" type="button" disabled title="Available in the full version">Download encrypted backup</button>
        </section>
        <section className="backup-card">
          <span className="security-state-icon"><AppIcon name="shield" aria-hidden="true" size={19} /></span>
          <p className="eyebrow">RESTORE BACKUP</p>
          <h3>Available in the full version.</h3>
          <p>Only a decrypted, validated backup can replace local records on this device.</p>
          <button className="secondary-button" type="button" disabled title="Available in the full version">Decrypt and preview</button>
        </section>
      </div>
    </div>
  );
}
