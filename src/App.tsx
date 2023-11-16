import styled from "styled-components";

import DesktopLight from "./assets/bg-desktop-light.jpg";
import moon from "./assets/moon.svg";
import oval from "./assets/Oval Copy.svg";

function App() {
  // const data = ["All", "Active", "Completed"];

  return (
    <>
      <Wrapper>
        <HeaderImgs src={DesktopLight} alt="header img" />
        <ContentWrapper>
          <TiTleContainer>
            <h1>todo</h1>
            <img src={moon} alt="" />
          </TiTleContainer>
          <div>
            <InputWrapper>
              <img src={oval} alt="" />
              <input placeholder="Currently typing" />
            </InputWrapper>
            <div>
              <div>
                <span>5 items left</span>
                {/* <div>
                  {data.map((index, item) => {
                    <span key={index}>{item}</span>;
                  })}
                </div> */}
                <span>Clear Completed</span>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
`;
const HeaderImgs = styled.img`
  width: 100%;
  height: 44vh;
`;
const ContentWrapper = styled.div`
  max-width: 540px;
  width: 100%;
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translateX(-50%);
`;
const TiTleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    color: #fff;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 15px;
    text-transform: uppercase;
  }
`;
const InputWrapper = styled.div`
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5);
  padding: 20px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  input {
    border: none;
    margin-left: 24px;
    color: #393a4b;
    font-size: 18px;
    letter-spacing: -0.25px;
    width: 100%;
  }
`;
