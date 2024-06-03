import './App.css'

// importing the VideoJS Functional component
import VideoPlayer from './player'

const App = () => {
  return (
    <div>
      <h1>My Video App</h1>
        <VideoPlayer />
    </div>
  );
};

export default App
// import React from 'react';
// import './index.css';
// import Hls from 'hls.js';

// class App extends React.Component {
//   state = {
//     showModal: false,
//   };
//   myRef = React.createRef();

//   toggle = () => {
//     this.setState(
//       {
//         showModal: true,
//       },
//       () => {
//         var videoSrc = 'http://192.168.100.1:9981/playlist/channels.m3u';
//         // var videoSrc = "http://192.168.100.1:9981/stream/channelid/2120785922?ticket=A1D9A7E65992ADC1F93E8B70B848FD32C4118606&profile=pass";
//         // var videoSrc = src;
//         if (Hls.isSupported()) {
//           // var hls = new Hls({xhrSetup: (xhr) => {
//           //   xhr.setRequestHeader("Access-Control-Allow-Origin", "http://172.20.10.4");
//           // }});
//         // if (Hls.isSupported()) {
//           var hls = new Hls();
//           hls.loadSource(videoSrc);
//           hls.attachMedia(this.myRef.current);
//           hls.on(Hls.Events.MEDIA_ATTACHING, (event, data) => {

//           });
//         }
//       }
//     );
//   };

//   render() {
//     return (
//       <>
//         <button onClick={this.toggle}>Toggle</button>
//         <br />
//         {this.state.showModal && (
//           <video
//             autoPlay
//             controls
//             ref={this.myRef}
//             style={{ height: 300 }}
//           ></video>
//         )}
//       </>
//     );
//   }
// }

// export default App;
