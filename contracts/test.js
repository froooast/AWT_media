mapping (bytes32 => Period) public periodsMapping;
mapping (bytes32 => AdaptionSet) public adationsMapping;
mapping (bytes32 => RepresentationSet) public representationsMapping;

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
    bytes32[] SegmentURL;
  }


// Call to add new period
    _addPeriod(
      mediaHash,
      _baseUrl,
      _duration
    );



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


    // Call to add new adaption
    _addAdaptionSet(
        mediaHash,
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
        _segmentURLCount
    );


    function _addPeriod(
    bytes32 _mediaHash,
    string _baseUrl,
    string _duration
  )
    private
  {
    // Do this for all defined specimens.
    Period memory period = Period(
      _baseUrl,
      _duration
    );

    bytes32 periodHash = _getPeriodHash(
      _mediaHash,
      period.baseUrl,
      period.duration
    );

    mediasMapping[_mediaHash].periodHashes = periodHash;
    periodsMapping[periodHash] = period;
  }


  function _addAdaptionSet(
    bytes32 _mediaHash,
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
    for (uint i = 0; i < _adaptionsCount; i++) {
      AdaptionSet memory adaptions = AdaptionSet(
        _segmentAlignment,
        _maxWidth,
        _maxHeight,
        _maxFrameRate,
        _par,
        _lang
      );

      bytes32 adaptionHash = _getAdaptionHash(
        _mediaHash,
        adaptions.segmentAlignment,
        adaptions.maxWidth,
        adaptions.maxHeight,
        adaptions.maxFrameRate,
        adaptions.par,
        adaptions.lang
      );

      mediasMapping[_mediaHash].adaptionHashes[i] = adaptionHash;
      adationsMapping[adaptionHash] = adaptions;
    }
  }

  function _addRepresentationSet(
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
    uint _duration,
    string[] _SegmentURL,
    uint _representationCount,
    uint _SegmentURLCount
  )
    private
  {
    for (uint i = 0; i < _representationCount; i++) {
      RepresentationSet memory representations = RepresentationSet({
        id: _id,
        mimeType: _mimeType,
        codecs: _codecs,
        width: _width,
        height: _height,
        frameRate: _frameRate,
        sar: _sar,
        startWithSAP: _startWithSAP,
        bandwidth: _bandwidth,
        timescale: _timescale,
        duration: _duration,
        SegmentURL: new string[](_SegmentURLCount)
      }
      );

      //add segmentsURL
      for(uint t = 0; t < _SegmentURLCount; t++) {
          representations.SegmentURL[t] = _SegmentURL[t];
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
        representations.duration
      );
    

      mediasMapping[_mediaHash].representationHashes[i] = representationHash;
      representationsMapping[representationHash] = representations;
    }
  }