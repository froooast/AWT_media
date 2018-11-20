const testForUnknownAttributes = require("./testForUnknownAttributes")
const AdaptionSetConnector = require("./adaptionSet")

module.exports = (contract) => {
    const adaptionSetsConnector = AdaptionSetConnector(contract)

    const add = async ({ duration, baseUrl, adaptionSets, ...rest }) => {
        testForUnknownAttributes(rest)
        await contract.addPeriod(duration, baseUrl)
        if (adaptionSets.length) {
            // this is unsafe because a different period could have been added in the meantime
            const periodId = (await contract.getPeriodsLength.call() - 1)
            for (adaptionSet of adaptionSets) {
                await adaptionSetsConnector.add(periodId, adaptionSet)
            }
        }
    }
    const get = async (periodId) => {
        const rawResult = await contract.periods.call(periodId)
        const adaptionSets = await adaptionSetsConnector.getAll(periodId)
        return {
            duration: rawResult[0],
            baseUrl: rawResult[1],
            adaptionSets
        }
    }
    const getAll = async () => {
        const numPeriods = await contract.getPeriodsLength.call()
        const res = []
        for (let i=0; i<numPeriods; i++) {
            res.push(await get(i))
        }
        return res
    }
    return {
        add,
        get,
        getAll
    }
}