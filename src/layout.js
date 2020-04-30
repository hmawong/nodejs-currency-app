import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand h1" href="/"><i class="fas fa-coins"></i> XChangeRate$ Daily</a>
      </nav>
      <div className="container py-3">
        {props.children}
      </div>
      <footer className="p-3 bg-dark">
        <div className="mb-2">
            <a class="social-media-icon text-light" href="https://www.linkedin.com/in/hmawong/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            <a class="social-media-icon text-light" href="https://github.com/hmawong" target="_blank"><i class="fab fa-github"></i></a>
            <a class="social-media-icon text-light" href="https://www.facebook.com/hmawong" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a class="social-media-icon text-light" href="https://www.instagram.com/wonghoming" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
