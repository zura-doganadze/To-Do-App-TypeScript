import styled from "styled-components";

import HeaderImg from "./assets/headerimg.png";
import moon from "./assets/moon.svg";

function App() {
  return (
    <>
      <div>
        <HeaderImgs src={HeaderImg} alt="header img" />
        <div>
          <div>
            <h1>to do</h1>
            <img src={moon} alt="" />
          </div>
          <input type="text" />
        </div>
      </div>
    </>
  );
}

export default App;

const HeaderImgs = styled.img`
  width: 100%;
  height: 55vh;
`;
