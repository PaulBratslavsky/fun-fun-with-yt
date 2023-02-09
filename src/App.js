import logo from './logo.svg';
import './App.css';
import YouTubeFinal from './components/YouTubeFinal';

// TODO: THINK ABOUT OBJECT STRUCTURE FOR VIDEO
// - ID
// - START TIME
// - END TIME
// - VIDEO ID
// - VIDEO URL
// - CLIP TITLE

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <YouTubeFinal videoId={"h3CNLY7fSzU"} />
      </header>
    </div>
  );
}

export default App;
