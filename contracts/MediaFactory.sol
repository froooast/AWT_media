pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Media contract
 * @dev Contains all Media function and properties.
 */

contract MediaFactory is Ownable{

    // Initialize the safe math data types.
    using SafeMath for uint256;

    struct Media {
        string periodID;
        string mediaPresentationDuration;
        string maxSegmentDuration;
        string minBufferTime;
        string profiles;
        string baseURL;
        uint numAdaptionSets;
        // we store adaption sets in a mapping because thats easier 
        // https://ethereum.stackexchange.com/questions/12611/solidity-filling-a-struct-array-containing-itself-an-array
        uint nonce;
     //   AdaptionSet[] adaptionSets;
        mapping(uint => AdaptionSet) adaptionSets;
    }

    struct AdaptionSet {
        string mimeType;
        uint maxWidth;
        uint maxHeight;
        string maxFrameRate;
        uint numRepresentation;
 //       mapping(uint => Representation) representationSets;
    }
  /*
    struct Representation {
        string id;
        uint bandwidth;
        string codecs;
        uint width;
        uint height;
        string frameRate;
        string audioSamplingRate;
    }

    struct SegmentTemplate {
        string timescale;
        string initialization;
        string media;
        uint startNumber;
        uint duration;
        uint presentationTimeOffset;

    }

    struct AudioChannelConfiguration {
        string schemeIdUri;
        uint value;
    } */
     /*
    * Global Variables
    */

    uint mediaNonce = 1; // Used to generate unique hash values for media objects and all related objects as well.
    mapping (bytes32 => Media) public mediasMapping;
   
    event MediaCreated (
      bytes32 indexed mediaHash,
      string baseURL
    );

    //public function to create a MPD
    function createMedia(
        string _periodID,
        string _mediaPresentationDuration,
        string _maxSegmentDuration,
        string _minBufferTime,
        string _profiles,
        string _baseURL
    )
      public
      
    {
        _createMedia(
            _periodID,
            _mediaPresentationDuration,
            _maxSegmentDuration,
            _minBufferTime,
            _profiles,
            _baseURL
        );
    }

     //public function to add a adaptionSet to MPD
    function addAdaptionSetToMedia(
        bytes32 _mediaHash,
        string _mimeType,
        uint _maxWidth,
        uint _maxHeight,
        string _maxFrameRate
    ) public {
        _addAdaptionSetToMedia(
            _mediaHash,
            _mimeType,
            _maxWidth,
            _maxHeight,
            _maxFrameRate
        );
    }
    /*
    //public function to add a representation to a adaptionSet
    function addRepresentationToAdaptionSet(
        string _id,
        uint _bandwidth,
        string _codecs,
        uint _width,
        uint _height,
        string _frameRate,
        bytes32 _mediaHash,
        uint _numAdaptionSets,
        string _audioSamplingRate
    ) public {
        _addRepresentationToAdaptionSet(
            _id,
            _bandwidth,
            _codecs,
            _width,
            _height,
            _frameRate,
            _mediaHash,
            _numAdaptionSets,
            _audioSamplingRate
        );
    }
*/
    //create a unique mediaHash
    function _getMediaHash(
        string _periodID,
        string _mediaPresentationDuration,
        string _maxSegmentDuration,
        string _minBufferTime,
        string _profiles,
        string _baseURL,
        uint _nonce
    )
      public
      pure
      returns (bytes32)
    {
        return keccak256(
            abi.encodePacked(
              _periodID,
              _mediaPresentationDuration,
              _maxSegmentDuration,
              _minBufferTime,
              _profiles,
              _baseURL,
              _nonce
            )
        );
    }


    // public function to get a MPD
    function getMedia(bytes32 _mediaHash)
    public
    view
    returns (string, string, string, string, string, string, uint)
  {
  
    // Build a tuple with the attributes of the specimen object.
        return (
          mediasMapping[_mediaHash].periodID,
          mediasMapping[_mediaHash].mediaPresentationDuration,
          mediasMapping[_mediaHash].maxSegmentDuration,
          mediasMapping[_mediaHash].minBufferTime,
          mediasMapping[_mediaHash].profiles,
          mediasMapping[_mediaHash].baseURL,
          mediasMapping[_mediaHash].numAdaptionSets
        );
    }

    // public function to get a AdaptionSet out of a MPD
    function getAdaptionSet(bytes32 _mediaHash, uint numAdaptionSet)
    public
    view
    returns (string, uint, uint, string, uint)
    {
        return (
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].mimeType,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].maxWidth,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].maxHeight,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].maxFrameRate,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].numRepresentation
        );
    }
    /*
    // public function to get a AdaptionSet out of a MPD
    function getRepresentationSet(bytes32 _mediaHash, uint numAdaptionSet, uint numRepresentationSet)
    public
    view
    returns (string, uint, string, uint, uint, string)
    {
        return (
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].representationSets[numRepresentationSet].id,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].representationSets[numRepresentationSet].bandwidth,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].representationSets[numRepresentationSet].codecs,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].representationSets[numRepresentationSet].width,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].representationSets[numRepresentationSet].height,
            mediasMapping[_mediaHash].adaptionSets[numAdaptionSet].representationSets[numRepresentationSet].audioSamplingRate
        );
    }
  */
  /**
  * @dev Creates a media and stores it in the contract.
  * @dev A hash of the media is used as an unique key.
  */
    function _createMedia(
        string _periodID,
        string _mediaPresentationDuration,
        string _maxSegmentDuration,
        string _minBufferTime,
        string _profiles,
        string _baseURL
    )
    private
  {
      // Create the new media by the provided values.
        Media memory media = Media({
            periodID: _periodID,
            mediaPresentationDuration: _mediaPresentationDuration,
            maxSegmentDuration: _maxSegmentDuration,
            minBufferTime: _minBufferTime,
            profiles: _profiles,
            baseURL: _baseURL,
            numAdaptionSets: 0,
            nonce: mediaNonce

        });

      // Generate the unique hash to store the permit.
        bytes32 mediaHash = _getMediaHash(
            media.periodID,
            media.mediaPresentationDuration,
            media.maxSegmentDuration,
            media.minBufferTime,
            media.profiles,
            media.baseURL,
            media.nonce
        );

        mediasMapping[mediaHash] = media;

        emit MediaCreated(
            mediaHash,
            _baseURL
        );

        // Increase the permit nonce to get continuously unique hash values.
        mediaNonce = mediaNonce.add(1);
    }

  /**
  * @dev Creates a AdaptionSet and stores it in the media .
  * @dev A hash of the media is used as an unique key.
  */
    function _addAdaptionSetToMedia(
        bytes32 _mediaHash,
        string _mimeType,
        uint _maxWidth,
        uint _maxHeight,
        string _maxFrameRate
    ) private {
        Media storage media = mediasMapping[_mediaHash];
        media.adaptionSets[media.numAdaptionSets++] = AdaptionSet({
            mimeType: _mimeType,
            maxWidth: _maxWidth,
            maxHeight: _maxHeight,
            maxFrameRate: _maxFrameRate,
            numRepresentation: 0
        });
    }

    
    /**
  * @dev Creates a Representation and stores it in the adaptionSet.
  * @dev A hash of the media is used as an unique key.
  */
  /*
    function _addRepresentationToAdaptionSet(
        string _id,
        uint _bandwidth,
        string _codecs,
        uint _width,
        uint _height,
        string _frameRate,
        bytes32 _mediaHash,
        uint _numAdaptionSets,
        string _audioSamplingRate
    ) private {
        Media storage media = mediasMapping[_mediaHash];
        uint number = media.adaptionSets[_numAdaptionSets].numRepresentation++;
        media.adaptionSets[_numAdaptionSets].representationSets[number] = Representation({
            id: _id,
            bandwidth: _bandwidth,
            codecs: _codecs,
            width: _width,
            height: _height,
            frameRate: _frameRate,
            audioSamplingRate: _audioSamplingRate
        });
    }
  */
}