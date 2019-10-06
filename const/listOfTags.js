const fixedAssets = [
  "deposits (assets)",
  "fixed assets",
  "investment",
  "loan (assets)"
];
const currentAssets = [
  "bank account",
  "cash in hand",
  "current assets",
  "fixed assets",
  "investment",
  "stock in hand",
  "sundry debtors"
];

const liability = [
  "current liability",
  "loan (liability)",
  "secured loan",
  "sundry creditors"
];
const income = ["direct incomes", "indirect incomes", "sales account", "loss"];

const expenses = [
  "direct expenses",
  "duties and tax",
  "indirect expenses",
  "provisions",
  "profit"
];

const capital = ["capital account", "reserves and surplus"];

const assetList = fixedAssets.concat(currentAssets);
const liabilityList = capital.concat(liability);
const debitList = assetList.concat(expenses);
const creditList = liabilityList.concat(income);
const list = debitList.concat(creditList);
module.exports = {
  list,
  creditList,
  debitList,
  liabilityList,
  assetList,
  fixedAssets,
  currentAssets,
  capital,
  liability,
  expenses,
  income
};
