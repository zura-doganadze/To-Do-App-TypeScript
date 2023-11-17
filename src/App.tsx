import styled from "styled-components";

import DesktopLight from "./assets/bg-desktop-light.jpg";
import moon from "./assets/moon.svg";
import oval from "./assets/Oval Copy.svg";

function App() {
  const data: string[] = ["All", "Active", "Completed"];

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
              <FooterWrapper>
                <span>5 items left</span>
                <Datacontainer>
                  {data.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </Datacontainer>
                <ClearButton>Clear Completed</ClearButton>
              </FooterWrapper>
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

//FooterWrapper
const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.194px;
  color: #9495a5;
`;

const Datacontainer = styled.div`
  display: flex;
  column-gap: 20px;
  span {
    cursor: pointer;
    &:hover {
      color: #494c6b;
    }
  }
`;
const ClearButton = styled.span`
  cursor: pointer;
`;
