import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar header-footer-bg">
        <a className="navbar-brand text-dark" href="/"><i class="fas fa-coins"></i> XChangeRate$ Daily</a>
        <div className="d-none d-sm-flex flex-grow-1">
          <div className="navbar-nav ml-auto flex-row">
            <a className="nav-item nav-link text-dark mr-3" href="/">Home</a>
            <a className="nav-item nav-link text-dark" href="/histChart">Historical Rate Charts</a>
          </div>
        </div>
      </nav>
      <div className="container py-3">
        {props.children}
      </div>
      <footer className="p-3 header-footer-bg" align="center">
        <div className="mb-1">
            <a className="social-media-icon text-secondary" href="https://www.linkedin.com/in/hmawong/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            <a className="social-media-icon text-secondary" href="https://github.com/hmawong" target="_blank"><i class="fab fa-github"></i></a>
            <a className="social-media-icon text-secondary" href="https://www.facebook.com/hmawong" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a className="social-media-icon text-secondary" href="https://www.instagram.com/wonghoming" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
        <div>
          <small class="text-secondary">© Anthony Wong. 2020</small>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
