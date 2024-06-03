import { useEffect, useRef, useState } from 'react';
import 'video.js/dist/video-js.css';
import { mp4, mp2t } from "mux.js"
// import { Player } from 'video-react';

// import { useEffect, useRef } from 'react';
// // import { fromFetch } from 'fetch-readablestream';
// import { MuxDemux } from 'mux.js';

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const mediaSourceRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     const mediaSource = new MediaSource();
//     mediaSourceRef.current = mediaSource;

//     fetch("http://192.168.100.1:9981/stream/channelid/1716352676?ticket=BBE208F603618773F2A9529E4C22E84A77D7ECB1&profile=pass")
//       // .then(res => fromFetch(res.body))
//       .then(stream => {
//         const muxDemux = new MuxDemux({
//           transmuxPipeline: {
//             type: 'mp4'
//           },
//         });

//         muxDemux.feed(stream);

//         muxDemux.on('data', (chunk) => {
//           mediaSource.appendBuffer(chunk.data);
//         });

//         mediaSource.addEventListener('sourceopen', () => {
//           video.src = URL.createObjectURL(mediaSource);
//           video.play();
//         });
//       });

//     return () => {
//       mediaSource.close();
//       URL.revokeObjectURL(video.src);
//     };
//   }, []);

//   return <video ref={videoRef} />;
// };

const VideoPlayer = () => {
  const [segments, setSegments] = useState([]);
  const flag = useRef(false);
    // [
    // // "http://192.168.100.1:9981/stream/channelid/1716352676?ticket=BBE208F603618773F2A9529E4C22E84A77D7ECB1&profile=pass"
    // ]
  // );

  // Replace this value with your files codec info
  let mime = 'video/mp4; codecs="mp4a.40.2,avc1.64001f"';

  let mediaSource = useRef(new MediaSource());
  let transmuxer = useRef(new mp4.Transmuxer());

  let sourceBuffer = useRef(null);

  const video = useRef(null);
  useEffect(() => {
    fetch("http://192.168.100.1:9981/stream/channelid/1716352676?ticket=BBE208F603618773F2A9529E4C22E84A77D7ECB1&profile=pass")
    .then((response) => response.body)
    .then((rb) => {
    const reader = rb.getReader();

    return new ReadableStream({
      start(controller) {

        // The following function handles each data chunk
        function push() {
          // "done" is a Boolean and value a "Uint8Array"
          reader.read().then(({ done, value }) => {
            // If there is no more data to read
            if (done) {
              console.log("done", done);
              controller.close();
              return;
            }
            // Get the data and send it to the browser via the controller
            controller.enqueue(value);
            setSegments((v) => {
              v.push(value);
              return v;
            });
            // Check chunks by logging to the console
            // console.log(done, value);
            push();
          });
        }

        push();
      },
    });
  })
  .then((stream) =>
    // Respond with our stream
    new Response(stream, { headers: { "Content-Type": "text/html" } }).text(),
  )
  .then((result) => {
    // Do things with result
    console.log(result);
  });
    video.current.src = URL.createObjectURL(mediaSource.current);
  },
  []
);

  useEffect(() => {
    console.log(segments.length);
    if (segments.length != 0 && !flag.current) {
      flag.current = true;
      mediaSource.current.addEventListener("sourceopen", appendFirstSegment);
      console.log("flag")
    }
  }, [segments]);

function appendFirstSegment(){
  console.log("gholam ");
  if (segments.length == 0){
    console.log("empty!")
    return;
  }
  
  URL.revokeObjectURL(video.src);
  sourceBuffer.current = mediaSource.current.addSourceBuffer(mime);
  sourceBuffer.current.addEventListener('updateend', appendNextSegment);

  transmuxer.current.on('data', (segment) => {
    console.log("gholam 1.5");
    let data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength);
    data.set(segment.initSegment, 0);
    data.set(segment.data, segment.initSegment.byteLength);
    console.log(mp4.tools.inspect(data));
    sourceBuffer.current.appendBuffer(data);
    // reset the 'data' event listener to just append (moof/mdat) boxes to the Source Buffer
    transmuxer.current.off('data');
  })
  console.log("gholam 2");
  
  transmuxer.current.push(segments[0]);
  setSegments((v) => {
    v.shift()
    return v;
  })
  transmuxer.current.push();
  transmuxer.current.flush();
  
    // fetch(segments.current.shift()).then((response)=>{
  //     return response.arrayBuffer();
  //   }).then((response) => {
  //     transmuxer.current.push(new Uint8Array(response));
  //     transmuxer.current.flush();
  //   })
  }

  function appendNextSegment(){
    transmuxer.current.on('data', (segment) =>{
      sourceBuffer.current.appendBuffer(new Uint8Array(segment.data));
      transmuxer.current.off('data');
    })

    if (segments.length == 0){
      // notify MSE that we have no more segments to append.
      mediaSource.endOfStream();
    }

    segments.forEach((segment) => {
      transmuxer.current.push(segment);
      transmuxer.current.flush();
      // fetch the next segment from the segments array and pass it into the transmuxer.push method
      // fetch(segments.current.shift()).then((response)=>{
      //   return response.arrayBuffer();
      // }).then((response)=>{

      // })
    })
  }

  return (
    <>
      <video ref={video} 
        controls 
        width="80%">
      </video>
    </>
  )
}

// export default VideoPlayer;

// const VideoPlayer = () => {
//    return (
//      <>
//        <Player
//          playsInline
//         //  type="application/x-mpegURL"
//         type="video/mp2t"
//         //  src={props.src}
//          src="http://192.168.100.1:9981/stream/channelid/1716352676?ticket=BBE208F603618773F2A9529E4C22E84A77D7ECB1&profile=pass"
//          fluid={false}
//          width={720}
//          height={300}
//          playbackRate={[0.5, 1, 1.5, 2]}
//        />
//       </>
//    );
// };

// import { useRef } from 'react';
// import VideoJS from 'react-video-js-player';
// import 'video.js/dist/video-js.css';

// const VideoPlayer = () => {
//   const videoNode = useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     sources: [
//       {
//         src: 'http://192.168.100.1:9981/stream/channelid/1528917281?ticket=57CE014FB47CFA6F570B81F00AA8F1E77983C14F&profile=pass',
//         // type: 'application/x-mpegURL',
//         type: 'application/dash+xml',
//       },
//     ],
//   };

//   return (
//     <VideoJS options={videoJsOptions} ref={videoNode} />
//   );
// };

// export default VideoPlayer;
// import { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import videojs from 'video.js';

// const usePlayer = ({ src, controls, autoplay }) => {
//   const options = {
//     fill: true,
//     fluid: true,
//     preload: 'auto',
//     html5: {
//       hls: {
//         enableLowInitialPlaylist: true,
//         smoothQualityChange: true,
//         overrideNative: true,
//       },
//     },
//   };
//   const videoRef = useRef(null);
//   const [player, setPlayer] = useState(null);

//   useEffect(() => {
//     const vjsPlayer = videojs(videoRef.current, {
//       ...options,
//       controls,
//       autoplay,
//       sources: [src],
//     });
//     setPlayer(vjsPlayer);

//     return () => {
//       if (player !== null) {
//         player.dispose();
//       }
//     };
//   }, []);
//   useEffect(() => {
//     if (player !== null) {
//       player.src({ src });
//     }
//   }, [src]);

//   return videoRef;
// };

// const VideoPlayer = ({ src, controls, autoplay }) => {
//   const playerRef = usePlayer({ src, controls, autoplay });

//   return (
//     <div data-vjs-player>
//       <video ref={playerRef} className="video-js" />
//     </div>
//   );
// };

// VideoPlayer.propTypes = {
//   src: PropTypes.string.isRequired,
//   controls: PropTypes.bool,
//   autoplay: PropTypes.bool,
// };

// VideoPlayer.defaultProps = {
//   controls: true,
//   autoplay: true,
// };

export default VideoPlayer;
// export default VideoPlayer;