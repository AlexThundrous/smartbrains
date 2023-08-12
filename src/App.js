import React, { Component } from 'react'
import ParticlesBg from 'particles-bg'
import Navigation from './components/navigation/navigation.js'
import Logo from './components/logo/logo.js'
import Rank from './components/rank/rank.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Signin from './components/signin/signin.js'
import Register from './components/Register/register.js'
import './App.css';

const predict = (imageurl) => {
  const PAT = '41d5c7df1e1a4005aaf6371430b6f75d';
  const USER_ID = 'rg06e54ybxa5';
  const APP_ID = 'face-detection';
  const IMAGE_URL = imageurl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ' ',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs && data.outputs[0].data && data.outputs[0].data.regions) {
      const regions = data.outputs[0].data.regions;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      
      return regions.map(region => {
        const clarifaiFace = region.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        };
      });
    } else {
      console.log("Invalid response format:", data);
      return [];
    }
  }
  


  displayFaceBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  }
  

  onSearchChange = (event) => {
    this.setState({ input: event.target.value });
  }


  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", predict(this.state.input))
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch("http://localhost:3001/image", {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
  
        }
        const faceLocations = this.calculateFaceLocations(result);
        this.displayFaceBoxes(faceLocations);
      })
      .catch(error => console.log('error', error));
  }
  

  onRouteChange = (Route) => {
    this.setState({ route: Route });
  }

  render() {
    return (
      <div className="flex flex-col">
        <ParticlesBg type="cobweb" bg={true} color="#7C3AED" />
        {this.state.route === 'signin' || this.state.route === 'register' ? (this.state.route === 'signin' ?
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <div>
            <Navigation onRouteChange={this.onRouteChange} /> {/* Use this.onRouteChange */}
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onSearchChange={this.onSearchChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
