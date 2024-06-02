import 'video.js/dist/video-js.css';
import { Player } from 'video-react';


const VideoPlayer = () => {
   return (
     <>
       <Player
         playsInline
         type="application/x-mpegURL"
        //  src={props.src}
         src="http://192.168.100.1:9981/stream/channelid/1716352676?ticket=BBE208F603618773F2A9529E4C22E84A77D7ECB1&profile=pass"
         fluid={false}
         width={720}
         height={300}
         playbackRate={[0.5, 1, 1.5, 2]}
       />
      </>
   );
};

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