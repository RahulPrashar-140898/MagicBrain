import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import {Component} from 'react';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Particles from 'react-particles-js';
//import faceRecognitionComponent from './Components/faceRecognitionComponent/faceRecognitionComponent'
import Tilt from 'react-tilt'
import Face from './Components/Face/Face'
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: 'fdb9ec35a95a48bcafcfe38c4e5cdf3a'
 });
 

const particlesOptions = {
  particles: {
    number: {
      value: 330,
      density: {
        enable: true,
        value_area: 1800
      }
    }
  }
}

class App extends Component {
  
  constructor(){
    super()
this.state={value:'',
box:[],detect:0};
  }

  displayFaceBox = async(box) => {
  await  this.setState({box: box,detect:0});
  await this.setState({detect:1});  
}

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

onInputChange=async(e)=>{
  let val=e.target.value;
  console.log(val);
await this.setState({value : val });
if(val=="")
await this.setState({detect:0});

}
onButtonSubmit=async()=>{
  //this.setState({imageUrl: this.state.input});
  app.models
    .predict(
      // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
      // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
      // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
      // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
      // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
      // so you would change from:
      // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      // to:
      // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
      Clarifai.FACE_DETECT_MODEL,
      this.state.value
      )
      .then(response => {this.displayFaceBox(this.calculateFaceLocation(response));
      console.log('comeon we did',response  );
      }  )
    .catch(err =>{console.log('something went wrong'); 
      console.log(err);});


}


  render(){
    return ( <div className="App" >
     <Particles className='particles'
          params={particlesOptions}
        />
      <div classname="flex"  >
      <Tilt className="Tilt myimg ps-5 pt-3 " options={{ max : 105 }} style={{ height: 240, width: 250 }} >
<img src="https://previews.123rf.com/images/olegerin/olegerin2005/olegerin200500003/146515945-cute-smart-brain-color-vector-character-reading-big-book-and-thinking.jpg" alt="" srcset=""/>
 
</Tilt>

<Tilt className="Tilt myimg ps-5 pt-3 " options={{ max : 35 }}  >
<div className="heading">
  Magic Brain
</div> 
</Tilt>



        </div>  
 
        <ImageLinkForm  value={this.state.value}  onChangeValueHandler={this.onInputChange} onButtonSubmit={this.onButtonSubmit} ></ImageLinkForm>
       <Face imageUrl={this.state.value}  detect={this.state.detect} box={this.state.box} ></Face>
        </div>
    );}
}

export default App;


