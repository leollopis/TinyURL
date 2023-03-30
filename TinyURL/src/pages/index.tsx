import { useState, useEffect } from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';

interface Props {
  shortUrl?: string;
}

const Home = (props: Props) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(props.shortUrl || '');

  
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (longUrl === '') {
        console.log("Erreur, c'est vide")
    } else {
      try {
        const response = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ longUrl }),
        });
        const shortUrl = await response.json();
        setShortUrl(shortUrl);
      } catch (error) {
        console.error(error);
      }
    }

  };

  return (
    <>
      <Helmet>
        <title> TinyURL - IUT </title>
      </Helmet>

      <main>
        <h1>Tiny URL</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" id="long-url" value={longUrl} onChange={(event) => setLongUrl(event.target.value)}/> 
          <button type="submit">Raccourcir</button>
        </form>
        {(() => {
          if (shortUrl) {
            return (
              <div className="container">
                <p>Lien : </p>
                <div className="casscouille">
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                    {shortUrl}
                  </a>
                </div>
              </div>
            );
          }
        })()}
      </main>
    </>
  );
};

export default Home;