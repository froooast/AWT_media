pragma solidity ^0.4.24;

/**
 * @title Media contract
 * @dev Contains all Media function and properties.
 */

contract Media {
    Period[] periods;

    struct Period {
        string baseUrl;
        AdaptionSet[] adaptionSet;
        string duration;
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
    
    function createPeriod(
        string baseURl,
        string duration
    ) {
        Period storage newPeriod = Period();
        
        periods.push(newPeriod);
    }
}
