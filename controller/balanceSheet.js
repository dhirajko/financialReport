const { allAssets, liabilityAndCapital } = require('../utils/listOfTags')
const { User } = require('../model/user')

const balanceSheetCalculator = async (userId) => {
    const user = await User.findById(userId)
    .populate('accounts')
    .select('-password')
}


module.exports = balanceSheetCalculator