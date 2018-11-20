module.exports = (contract) => {
    const add = async (periodId, adaptionSetId, representation) => {
        await contract.addRepresentationToAdaptionSet(periodId, adaptionSetId, representation)
    }
    const get = async (periodId, adaptionSetId, representationId) => {
        return contract.getRepresentation.call(periodId, adaptionSetId, representationId)
    }
    const getAll = async (periodId, adaptionSetId) => {
        const numRepresentations = +await contract.getNumRepresentations.call(periodId, adaptionSetId)
        const res = []
        for (let i=0; i<numRepresentations; i++) {
            res.push(await get(periodId, adaptionSetId, i))
        }
        return res
    }
    return {
        add,
        get,
        getAll
    }
}