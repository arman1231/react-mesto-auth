import React from "react";

function getCurrentYear() {
  const date = new Date()
  return date.getFullYear();
}
export default function Footer() {
  return (
    <footer className="footer page__footer">
      <p className="footer__text">&copy;{` ${getCurrentYear()} Mesto Russia`}</p>
    </footer>
  );
}
