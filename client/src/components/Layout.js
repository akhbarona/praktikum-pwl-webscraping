import React from 'react'


function Layout(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Praktikum Web Scraping </h1>
      </header>
      <main className="App-body">{props.children}</main>
      <footer className="App-footer">
        <div className="links">

          <a href="https://github.com/akhbarona">
            <img
              width={24}
              height={24}
              src="https://img.icons8.com/metro/26/000000/github.png"
              alt=""
            ></img>
            Github
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Layout