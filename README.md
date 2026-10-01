# Live Salary Ticker — UI Demo

A public UI demo of the Live Salary Ticker app. All data is hardcoded for demonstration purposes. The full version with encrypted local storage, financial calculation engines, and backup features is available separately.

## Setup

```bash
npm install && npm run dev
```

## Live demo

https://sallery-app-ui.vercel.app

## About this demo

- All figures use mock data: **PKR 30,000/month** salary, employee M. Kamran, joined 2024-01-01.
- No real data is stored or transmitted anywhere.
- Mutation actions (save, add, delete) show a "available in the full version" message instead of writing data.
- Backup, restore, PIN lock, and passkey panels are disabled stubs.

## Full version

The full version includes:
- Encrypted local storage (IndexedDB via Dexie)
- Financial calculation engine (live earnings ticker, company balance, pocket ledger)
- AES-256 encrypted backup and restore
- PIN lock and passkey security
- CSV and PDF export of all records
