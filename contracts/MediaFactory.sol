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
    string preview;
    string title;
    // we store adaption sets in a mapping because thats easier 
    // https://ethereum.stackexchange.com/questions/12611/solidity-filling-a-struct-array-containing-itself-an-array
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
    string mimeType;
    string codecs;
    string sar;
    uint startWithSAP;
    uint bandwidth;
    uint timescale;
    uint duration;
    bytes32[] SegmentURL;
  }

    /*
   * Global Variables
   */

  uint mediaNonce = 1; // Used to generate unique hash values for media objects and all related objects as well.
  mapping (bytes32 => Media) public mediasMapping;
  mapping (bytes32 => Period) public periodsMapping;
  mapping (bytes32 => AdaptionSet) public adationsMapping;
  mapping (bytes32 => RepresentationSet) public representationsMapping;

  event MediaCreated (
    bytes32 indexed mediaHash,
    string baseURL
  );

  event PeriodCreated (
    bytes32 indexed periodHash
  );

  event AdaptionSetCreated (
    bytes32 indexed adaptionSetHash
  );

  event RepresentationSetCreated (
    bytes32 indexed representationHash
  );

  function createMedia(
    
    string _preview,
    string _title
  )
    public
  {
    _createMedia(
      _preview,
      _title
    );
  }

   function createPeriod(
    
    string _baseUrl,
    string _duration
  )
    public
  {
    _createPeriod(
      _baseUrl,
      _duration
    );
  }

  function createAdaptionSet(
    
    bool _segmentAlignment,
    uint _maxWidth,
    uint _maxHeight,
    uint _maxFrameRate,
    string _par,
    string _lang
  )
    public
  {
    _createAdaptionSet(
      _segmentAlignment,
      _maxWidth,
      _maxHeight,
      _maxFrameRate,
      _par,
      _lang
    );
  }

  function createRepresentationSet(
    string _mimeType,
    string _codecs,
    string _sar,
    uint _startWithSAP,
    uint _bandwidth,
    uint _timescale,
    uint _duration,
    bytes32[] _SegmentURL,
    uint _representationCount,
    uint _SegmentURLCount
  )
    public
  {
    _createRepresentationSet(
      _mimeType,
      _codecs,
      _sar,
      _startWithSAP,
      _bandwidth,
      _timescale,
      _duration,
      _SegmentURL,
      _representationCount,
      _SegmentURLCount
    );
  }

  function _getMediaHash(
    string _preview,
    string _title,
    uint _nonce
  )
    private
    pure
    returns (bytes32)
  {
    return keccak256(
      abi.encodePacked(
        _preview,
        _title,
        _nonce
      )
    );
  }

  function _getPeriodHash(
      string _baseUrl,
      string _duration
    )
      private
      pure
      returns (bytes32)
    {
      return keccak256(
        abi.encodePacked(
              _baseUrl,
              _duration
        )
      );
    }

  function _getAdaptionHash(
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
      string _mimeType,
      string _codecs,
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
              _mimeType,
              _codecs,
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
    string _preview,
    string _title
  )
    private
  {
    // Create the new media by the provided values.
    Media memory media = Media({
        preview: _preview,
        title: _title,
        nonce: mediaNonce
    });

    // Generate the unique hash to store the permit.
    bytes32 mediaHash = _getMediaHash(
      media.preview,
      media.title,
      media.nonce
    );

    mediasMapping[mediaHash] = media;

    emit MediaCreated(
      mediaHash,
      _title
    );

    // Increase the permit nonce to get continuously unique hash values.
    mediaNonce = mediaNonce.add(1);
  }


  function getMedia(bytes32 _mediaHash)
    public
    view
    returns (string, string)
  {
  
    // Build a tuple with the attributes of the specimen object.
    return (
      mediasMapping[_mediaHash].preview,
      mediasMapping[_mediaHash].title
    );
  }

  function _createPeriod(
    string _baseUrl,
    string _duration
  )
    private
  {
    // Create the new period by the provided values.
    Period memory period = Period({
        baseUrl: _baseUrl,
        duration: _duration
    });

    // Generate the unique hash to store the permit.
    bytes32 periodHash = _getPeriodHash(
        period.baseUrl,
        period.duration
    );

    periodsMapping[periodHash] = period;
    
    emit PeriodCreated(
      periodHash
    );

  }

  function getPeriod(bytes32 _periodHash)
    public
    view
    returns (string, string)
  {
  
    // Build a tuple with the attributes of the specimen object.
    return (
      periodsMapping[_periodHash].baseUrl,
      periodsMapping[_periodHash].duration
    );
  }

  function _createAdaptionSet(
    bool _segmentAlignment,
    uint _maxWidth,
    uint _maxHeight,
    uint _maxFrameRate,
    string _par,
    string _lang
  )
    private
  {
    AdaptionSet memory adaptions = AdaptionSet(
      _segmentAlignment,
      _maxWidth,
      _maxHeight,
      _maxFrameRate,
      _par,
      _lang
    );

    bytes32 adaptionHash = _getAdaptionHash(
      adaptions.segmentAlignment,
      adaptions.maxWidth,
      adaptions.maxHeight,
      adaptions.maxFrameRate,
      adaptions.par,
      adaptions.lang
    );

    adationsMapping[adaptionHash] = adaptions;

    emit AdaptionSetCreated(
      adaptionHash
    );
  }

  function getAdaptionSet(bytes32 _adaptionHash)
    public
    view
    returns (
      bool,
      uint,
      uint,
      uint,
      string,
      string
      )
    {
  
    // Build a tuple with the attributes of the specimen object.
    return (
      adationsMapping[_adaptionHash].segmentAlignment,
      adationsMapping[_adaptionHash].maxWidth,
      adationsMapping[_adaptionHash].maxHeight,
      adationsMapping[_adaptionHash].maxFrameRate,
      adationsMapping[_adaptionHash].par,
      adationsMapping[_adaptionHash].lang
    );
  }
  
  function _createRepresentationSet(
    string _mimeType,
    string _codecs,
    string _sar,
    uint _startWithSAP,
    uint _bandwidth,
    uint _timescale,
    uint _duration,
    bytes32[] _SegmentURL,
    uint _representationCount,
    uint _SegmentURLCount
  )
    private
  {
    for (uint i = 0; i < _representationCount; i++) {
      RepresentationSet memory representations = RepresentationSet({
        mimeType: _mimeType,
        codecs: _codecs,
        sar: _sar,
        startWithSAP: _startWithSAP,
        bandwidth: _bandwidth,
        timescale: _timescale,
        duration: _duration,
        SegmentURL: new bytes32[](_SegmentURLCount)
      }
      );

      //add segmentsURL
      for(uint t = 0; t < _SegmentURLCount; t++) {
          representations.SegmentURL[t] = _SegmentURL[t];
      }

      bytes32 representationHash = _getRepresentationHash(
        representations.mimeType,
        representations.codecs,
        representations.sar,
        representations.startWithSAP,
        representations.bandwidth,
        representations.timescale,
        representations.duration
      );

      representationsMapping[representationHash] = representations;
    }

    emit RepresentationSetCreated(
      representationHash
    );
  }

  function getRepresentationSet(bytes32 _representationHash)
    public
    view
    returns (
      string,
      string,
      string,
      uint,
      uint,
      uint,
      bytes32[]
    )
  {
  
    // Build a tuple with the attributes of the specimen object.
    return (
      representationsMapping[_representationHash].mimeType,
      representationsMapping[_representationHash].codecs,
      representationsMapping[_representationHash].sar,
      representationsMapping[_representationHash].bandwidth,
      representationsMapping[_representationHash].timescale,
      representationsMapping[_representationHash].duration,
      representationsMapping[_representationHash].SegmentURL
    );
  }

}