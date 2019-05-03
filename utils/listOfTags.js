const _=require('lodash')

const fixedAssets = [
    'deposits (assets)',
    'fixed assets',
    'investment',
    'loan (assets)',
]
const currentAssets = [
    'bank account',
    'cash in hand',
    'current assets',
    'fixed assets',
    'investment',
    'stock in hand',
    'sundry debtors',
    ]

const liability = [
    'current liability',
    'loan (liability)',
    'secured loan',
    'sundry creditors',
]
const income = [
    'direct incomes',
    'indirect incomes',
    'sales account',
    'loss'
]

const expenses = [
    'direct expenses',
    'duties and tax',
    'indirect expenses',
    'provisions',
    'profit'
]

const capital = [    
    'capital account',    
    'reserves and surplus' 
  ]

const allAssets=_.concat(fixedAssets,currentAssets)
const liabilityAndCapital=_.concat(capital,liability)
const allDebit=_.concat(allAssets,expenses)
const allCredit=_.concat(liabilityAndCapital,income)
const allTags=_.concat(allDebit,allCredit)
module.exports = {allTags,allDebit,allCredit,allAssets,liabilityAndCapital,fixedAssets,currentAssets,capital,liability,income,expenses}