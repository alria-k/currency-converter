import { createGlobalStyle } from "styled-components";

const ResetCss = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ul,
  ol {
    padding: 0;
  }
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }
  body {
    position: relative;
    margin: 15px 0 50px 0;
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
    background-color: #F6F6F6;
    color: black;
  }
  ul,
  ol,
  li {
    list-style: none;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  img {
    max-width: 100%;
    display: block;
  }
  article>*+* {
    margin-top: 1em;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  button {
    cursor: pointer;
  }
  p, a, input{
    font-weight: 400;
    font-style: normal;
  }
  h1 {
    font-weight: 600;
    font-style: normal;
  }
  h2, h3, h4, h5, h6{
    font-weight: 500;
    font-style: normal;
  }
`;

export function App() {
  return (
    <>
      <ResetCss />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
