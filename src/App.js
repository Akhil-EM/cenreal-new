import './App.css';
import '../src/assets/css/style.css'
// process.env.PUBLIC_URL+'/img/android-chrome-192x192.png'
import Router from './router/Router'
function App() {
 
  setGustId();
  return (<Router/>);
  //return(<AddressAddOrEditModal/>)

}

function setGustId(){
   let randStr=Math.random().toString(36).substring(2);
   localStorage.setItem('gustId',randStr);
}

export default App;
