export const fixedAssets = [
  "deposits (assets)",
  "fixed assets",
  "investment",
  "loan (assets)"
];
export const currentAssets = [
  "bank account",
  "cash in hand",
  "current assets", 
  "stock in hand",
  "sundry debtors"
];

export const liability = [
  "current liability",
  "loan (liability)",
  "secured loan",
  "sundry creditors"
];
export const income = [
  "direct incomes",
  "indirect incomes",
  "sales account",
  "loss"
];

export const expenses = [
  "direct expenses",
  "duties and tax",
  "indirect expenses",
  "provisions",
  "profit"
];

export const capital = ["capital account", "reserves and surplus"];

export const assetList = fixedAssets.concat(currentAssets);
export const liabilityList = capital.concat(liability);
export const debitList = assetList.concat(expenses);
export const creditList = liabilityList.concat(income);
export const list = debitList.concat(creditList);
