module.exports = (restObj) => {
    const attributes = Object.keys(restObj)
    if (attributes.length) {
        throw new Error("The following attributes were included in the .mpg file, but can not be stored in the smart contract: "+attributes.join(", "))
    }
}