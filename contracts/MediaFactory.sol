pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Media contract
 * @dev Contains all Media function and properties.
 */

contract MediaFactory {

  // Initialize the safe math data types.
  using SafeMath for uint256;

  struct Media {
    string xmlns;
    string minBufferTime;
    string typeName;
    string mediaPresentationDuration;
    string maxSegmentDuration;
    string profiles;
    string preview;
    string title;
    // we store adaption sets in a mapping because thats easier 
    // https://ethereum.stackexchange.com/questions/12611/solidity-filling-a-struct-array-containing-itself-an-array
    bytes32[] periodHashes;
    bytes32[] adaptionHashes;
    bytes32[] representationHashes;
    uint nonce;
  }

  struct Period {
    string baseUrl;
    string duration;
  }

  struct AdaptionSet {
    bool segmentAlignment;
    uint maxWidth;
    uint maxHeight;
    uint maxFrameRate;
    string par;
    string lang;
  }

  struct RepresentationSet {
    uint id;
    string mimeType;
    string codecs;
    uint width;
    uint height;
    uint frameRate;
    string sar;
    uint startWithSAP;
    uint bandwidth;
    uint timescale;
    uint duration;
    string[] SegmentURL;
  }



    /*
   * Global Variables
   */

  uint mediaNonce = 1; // Used to generate unique hash values for media objects and all related objects as well.
  mapping (bytes32 => Media) public medias;
  mapping (bytes32 => Period) public periods;
  mapping (bytes32 => AdaptionSet) public adations;
  mapping (bytes32 => RepresentationSet) public representations;


    event MediaCreated (
    bytes32 indexed permitHash
    );

  function createMedia(
    string _xmlns,
    string _minBufferTime,
    string _typeName,
    string _preview,
    string _mediaPresentationDuration,
    string _maxSegmentDuration,
    string _profiles,
    string _title
  )
    public
  {
    _createMedia(
        _xmlns,
        _minBufferTime,
        _preview,
        _typeName,
        _mediaPresentationDuration,
        _maxSegmentDuration,
        _profiles,
        _title
    );
  }

  function _getMediaHash(
    string _xmlns,
    string _minBufferTime,
    string _typeName,
    string _mediaPresentationDuration,
    string _maxSegmentDuration,
    string _profiles,
    string _title,
    uint _nonce
  )
    private
    pure
    returns (bytes32)
  {
    return keccak256(
      abi.encodePacked(
        _xmlns,
        _minBufferTime,
        _typeName,
        _mediaPresentationDuration,
        _maxSegmentDuration,
        _profiles,
        _title,
        _nonce
      )
    );
  }



  function _getPeriodHash(
    bytes32 _mediaHash,
    string _baseUrl,
    string _duration
  )
    private
    pure
    returns (bytes32)
  {
    return keccak256(
      abi.encodePacked(
            _mediaHash,
            _baseUrl,
            _duration
      )
    );
  }

 
    function _getAdaptionHash(
    bytes32 _mediaHash,
    bool _segmentAlignment,
    bool _segmentAlignment,
    uint _maxWidth,
    uint _maxHeight,
    uint _maxFrameRate,
    string _par,
    string _lang
  )
    private
    pure
    returns (bytes32)
  {
    return keccak256(
      abi.encodePacked(
            _mediaHash,
            _segmentAlignment,
            _segmentAlignment,
            _maxWidth,
            _maxHeight,
            _maxFrameRate,
            _par,
            _lang
      )
    );
  }

    

function _getRepresentationHash(
    bytes32 _mediaHash,
    uint _id,
    string _mimeType,
    string _codecs,
    uint _width,
    uint _height,
    uint _frameRate,
    string _sar,
    uint _startWithSAP,
    uint _bandwidth,
    uint _timescale,
    uint _duration
  )
    private
    pure
    returns (bytes32)
  {
    return keccak256(
      abi.encodePacked(
            _mediaHash,
            _id,
            _mimeType,
            _codecs,
            _width,
            _height,
            _frameRate,
            _sar,
            _startWithSAP,
            _bandwidth,
            _timescale,
            _duration
      )
    );
  }


 /**
   * @dev Creates a media and stores it in the contract.
   * @dev A hash of the media is used as an unique key.
 */
  function _createMedia(
    string _xmlns,
    string _minBufferTime,
    string _typeName,
    string _mediaPresentationDuration,
    string _maxSegmentDuration,
    string _profiles,
    string _preview,
    string _title,
    string baseUrl,
    string duration,
    bool _segmentAlignment,
    bool _segmentAlignment,
    uint _maxWidth,
    uint _maxHeight,
    uint _maxFrameRate,
    string _par,
    string _lang,
    uint _id,
    string _mimeType,
    string _codecs,
    uint _width,
    uint _height,
    uint _frameRate,
    string _sar,
    uint _startWithSAP,
    uint _bandwidth,
    uint _timescale,
    uint _duration,
    uint[] _periodCount,
    uint[] _adaptionsCount,
    uint[] _representationCount,
    string[] SegmentURL,
    uint[] _segmentURLCount
  )
    private
  {
    // Create the new media by the provided values.
    Media memory media = Media({
        xmlns: _xmlns,
        minBufferTime: _minBufferTime,
        typeName: _typeName,
        mediaPresentationDuration: _mediaPresentationDuration,
        periodHashes: new bytes32[](_periodCount.length),
        adaptionHashes: new bytes32[](_adaptionsCount.length),
        representationHashes: new bytes32[](_representationCount.length),
        maxSegmentDuration: _maxSegmentDuration,
        profiles: _profiles,
        preview: _preview,
        title: _title,
        nonce: mediaNonce
    });

    // Generate the unique hash to store the permit.
    bytes32 mediaHash = _getMediaHash(
      media.xmlns,
      media.minBufferTime,
      media.typeName,
      media.mediaPresentationDuration,
      media.maxSegmentDuration,
      media.profiles,
      media.preview,
      media.title,
      media.none
    );

    medias[mediaHash] = media;

    // Call to add new period
    _addPeriod(
      mediaHash,
      _periodCount,
      _baseUrl,
      _duration
    );

    // Call to add new adaption
    _addAdationSet(
        mediaHash,
        _segmentAlignment,
        _segmentAlignment,
        _maxWidth,
        _maxHeight,
        _maxFrameRate,
        _par,
        _lang,
        _adaptionsCount
    );

    // Call to add new representation
    _addRepresentationSet(
        mediaHash,
        _id,
        _mimeType,
        _codecs,
        _width,
        _height,
        _frameRate,
        _sar,
        _startWithSAP,
        _bandwidth,
        _timescale,
        _duration,
        _SegmentURL,
        _representationCount,
        _SegmentURLCount
    );

    emit MediaCreated(
      mediaHash
    );

    // Increase the permit nonce to get continuously unique hash values.
    mediaNonce = mediaNonce.add(1);
  }

 
  function _addPeriod(
    bytes32 _mediaHash,
    string _baseUrl,
    uint _periodCount,
    string _duration
  )
    private
  {
    // Do this for all defined specimens.
    for (uint i = 0; i < _periodCount.length; i++) {
      Period memory period = Period(
        period.mediaHash: _mediaHash,
        period.baseUrl: _baseUrl[i],
        period.duration: _duration[i]
      );

      bytes32 periodHash = _getPeriodHash(
        period.mediaHash,
        period.baseUrl,
        period.duration
      );

      media[_mediaHash].periodHashes[i] = periodHash;
      period[periodHash] = period;
    }
  }


  function _addAdaptionSet(
    bytes32 _mediaHash,
    bool _segmentAlignment,
    bool _segmentAlignment,
    uint _maxWidth,
    uint _maxHeight,
    uint _maxFrameRate,
    string _par,
    string _lang,
    uint _adaptionsCount
  )
    private
  {
    for (uint i = 0; i < _adaptionsCount.length; i++) {
      AdaptionSet memory adaptions = AdaptionSet(
        adaptions.mediaHash: _mediaHash,
        adaptions.segmentAlignment: _segmentAlignment,
        adaptions.segmentAlignment: _segmentAlignment,
        adaptions.maxWidth: _maxWidth,
        adaptions.maxHeight: _maxHeight,
        adaptions.maxFrameRate: _maxFrameRate,
        adaptions.par: _par,
        adaptions.lang: _lang
      );

      bytes32 adaptionHash = _getAdaptionHash(
       adaptions.mediaHash,
        adaptions.segmentAlignment,
        adaptions.segmentAlignment,
        adaptions.maxWidth,
        adaptions.maxHeight,
        adaptions.maxFrameRate,
        adaptions.par,
        adaptions.lang
      );

      media[_mediaHash].adaptionHashes[i] = adaptionHash;
      adaptions[adaptionHash] = adaptions;
    }
  }

  function _addRepresentationSet(
    uint _id,
    string _mimeType,
    uint _representationCount,
    string _codecs,
    uint _width,
    uint _height,
    uint _frameRate,
    string _sar,
    uint _startWithSAP,
    uint _bandwidth,
    uint _timescale,
    uint _duration,
    string[] _SegmentURL,
    uint _representationCount,
    uint _SegmentURLCount
  )
    private
  {
    for (uint i = 0; i < _representationCount.length; i++) {
      RepresentationSet memory representations = RepresentationSet(
        representations.id: _id,
        representations.mimeType: _mimeType,
        representations.codecs: _codecs,
        representations.width: _width,
        representations.height: _height,
        representations.frameRate: _frameRate,
        representations.sar: _sar,
        representations.startWithSAP: _startWithSAP,
        representations.bandwidth: _bandwidth,
        representations.timescale: _timescale,
        representations.duration: _duration,
        representation.SegmentURL: new String[](__SegmentURLCount.length),
      );

      //add segmentsURL
      for(uint t = 0; t < _SegmentURLCount; t++) {
          representation.SegmentURL[t] = _SegmentURL[t]
      }

      bytes32 representationHash = _getRepresentationHash(
        _mediaHash,
        representations.id,
        representations.mimeType,
        representations.codecs,
        representations.width,
        representations.height,
        representations.frameRate,
        representations.sar,
        representations.startWithSAP,
        representations.bandwidth,
        representations.timescale,
        representations.duration,
      );
    

      media[_mediaHash].representationHash[i] = representationHash;
      representations[representationHash] = representations;
    }
  }
}