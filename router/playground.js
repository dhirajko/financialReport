// this is just rough code for making work easier


function sample() {
    
    listOfTags=[ 'bank account',
    'capital account',
    'cash in hand',
    'current liability',
    'direct expenses',
    'indirect expense',
    'duties and tax',
    'investment',
    'loan (liability)',
    'provisions',
    'reserves and surplus',
    'sales account',
    'stock in hand',
    'sundry creditors',
    'unsecured account' ]
        
       const x= listOfTags.map(item=>{
            return item.trim().toLowerCase()
        })
        console.log(x);
        
}

module.exports=sample;