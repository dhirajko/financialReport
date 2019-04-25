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
    'sundry debtors']

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

const expesnse = [
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
const allTags=_.concat(allAssets,liabilityAndCapital,income,expesnse)
 {allTags,allAssets,liabilityAndCapital,fixedAssets,currentAssets,capital,liability,income,expesnse}

 module.exports =()=>{
console.log(allAssets);

 }
