pragma solidity ^0.4.24;

/**
 * @title Media contract
 * @dev Contains all Media function and properties.
 */

contract Media {
    Period[] public periods;

    struct Period {
        string baseUrl;
        string duration;
        // we store adaption sets in a mapping because thats easier 
        // https://ethereum.stackexchange.com/questions/12611/solidity-filling-a-struct-array-containing-itself-an-array
        uint numAdaptionSets;
        mapping(uint => AdaptionSet) adaptionSets;
    }

    struct AdaptionSet {
        bool segmentAlignment;
        uint maxWidth;
        uint maxHeight;
        uint maxFrameRate;
        string par;
        string lang;
        string[] representations;
    }
    
    function addPeriod(
        string baseUrl,
        string duration
    ) public {
        periods.push(Period({
            baseUrl: baseUrl,
            numAdaptionSets: 0,
            duration: duration
        }));
    }

    function addAdaptionSetToPeriod(
        uint periodId,
        bool segmentAlignment,
        uint maxWidth,
        uint maxHeight,
        uint maxFrameRate,
        string par,
        string lang
    ) public {
        Period storage period = periods[periodId];
        period.adaptionSets[period.numAdaptionSets++] = AdaptionSet({
            segmentAlignment: segmentAlignment,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            maxFrameRate: maxFrameRate,
            par: par,
            lang: lang,
            representations: new string[](0)
        });
    }
    function addRepresentationToAdaptionSet(uint periodId, uint adaptionSetId, string representation) public {
        periods[periodId].adaptionSets[adaptionSetId].representations.push(representation);
    }

    function getPeriodsLength() public constant returns (uint) {
        return periods.length;
    }

    function getAdaptionSet(uint periodId, uint adaptionSetId) public constant returns (
        bool segmentAlignment,
        uint maxWidth,
        uint maxHeight,
        uint maxFrameRate,
        string par,
        string lang
    ){
        AdaptionSet storage a = periods[periodId].adaptionSets[adaptionSetId];
        return (
            a.segmentAlignment,
            a.maxWidth,
            a.maxHeight,
            a.maxFrameRate,
            a.par,
            a.lang
        );
    }

    function getRepresentation(uint periodId, uint adaptionSetId, uint reprenstationId) public constant returns (string representation) {
        return periods[periodId].adaptionSets[adaptionSetId].representations[reprenstationId];
    }
    function getNumRepresentations(uint periodId, uint adaptionSetId) public constant returns (uint){
        return periods[periodId].adaptionSets[adaptionSetId].representations.length;
    }
}

