import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useState } from 'react';
import './App.scss';

// App URL
const GET_ALBUM_PHOTOS_URL = "https://jahwin.xyz/load/albums/";

const App = () => {
  // Set component state
  const [album_photo, setAlbumPhoto] = useState([]);
  const [album_id, setAlbumId] = useState("");
  const [album_loading, setAlbumLoading] = useState(false);

  // Get Album photo
  const getAlbumPhoto = () => {
    if (album_id) {
      setAlbumLoading(true);
      fetch(GET_ALBUM_PHOTOS_URL + album_id + "/photos")
        .then((response) => response.json())
        .then((photos) => {
          setAlbumLoading(false);
          setAlbumPhoto(photos)
        });
    }
  }

  // Render UI Func
  return (
    <div className="App">
      <div className="app-container">
        {/* Header component */}
        <Header></Header>
        {/* Form widget */}
        <div className="form-widget">
          <input placeholder="Enter Album Id" type="text" value={album_id} onChange={({ target }) => setAlbumId(target.value)} className="form-input" />
          <button className="btn-primary" onClick={getAlbumPhoto}>Get Album Photos By Id</button>
        </div>
        <div className="search-wizard-widget">
          {!album_loading ? album_photo.length > 0 ? (
            // Search result UI content
            <div className="search-result">
              {album_photo.map((album, index) => {
                return (
                  <div key={index} className="album-item">
                    <img className="album-image" src={album.thumbnailUrl} alt="" />
                    <label className="album-title">{album.title}</label>
                  </div>
                )
              })
              }
            </div>
          ) : (
            // When photo not found
            <div className="empty-widget">
              <p>Photo not available. Enter album ID then click on get Album button to get images</p>
            </div>
          ) : (
            // When loading Album photo
            <div className="loading-widget">
              <p>Loading Album...</p>
            </div>
          )}
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
