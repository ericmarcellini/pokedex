import React from 'react';
import Head from 'next/head';
import PokemonList from '../components/PokemonList';

const Home = () => {
  return (
    <>
      <Head>
        <title>PokeDex</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="css/styles.css" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
      </Head>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <div className="pokedex-logo">
            <img src="img/Pokédex_logo.webp" className="logo" alt="PokeDex Logo" />
          </div>
        </a>
      </nav>
      <br />
      <PokemonList />
    </>
  );
};

export default Home;