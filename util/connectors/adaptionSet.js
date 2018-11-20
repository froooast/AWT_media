const testForUnknownAttributes = require("./testForUnknownAttributes")
const RepresentationConnector = require("./representation")

module.exports = (contract) => {
    const representationConnector = RepresentationConnector(contract)

    const getNumAdaptionSets = async (periodId) => {
        return +(await contract.periods(periodId))[2]
    }
    
    const add = async (periodId, {segmentAlignment, maxWidth, maxHeight, maxFrameRate, par, lang, representations, ...rest}) => {
        testForUnknownAttributes(rest)
        await contract.addAdaptionSetToPeriod(periodId, segmentAlignment, maxWidth, maxHeight, maxFrameRate, par, lang)
        
        if (representations.length) {
            // this is unsafe because a different adaptionSets could have been added in the meantime
            const numAdaptionSets = await getNumAdaptionSets(periodId)
            for (representation of representations) {
                await representationConnector.add(periodId, numAdaptionSets-1, representation)
            }
        }
    }
    const get = async (periodId, adaptionSetId) => {
        const rawResult = await contract.getAdaptionSet.call(periodId, adaptionSetId)
        const representations = await representationConnector.getAll(periodId, adaptionSetId)
        return {
            segmentAlignment: rawResult[0],
            maxWidth: +rawResult[1],
            maxHeight: +rawResult[2],
            maxFrameRate: +rawResult[3],
            par: rawResult[4],
            lang: rawResult[5],
            representations
        }
    }

    const getAll = async (periodId) => {
        const numAdaptionSets = await getNumAdaptionSets(periodId)
        const res = []
        for (let i=0; i<numAdaptionSets; i++) {
            res.push(await get(periodId, i))
        }
        return res
    }
    return {
        add,
        get,
        getAll
    }
}