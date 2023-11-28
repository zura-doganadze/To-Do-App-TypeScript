import styled, { css } from "styled-components";
import DesktopLight from "./assets/bg-desktop-light.jpg";
import DesktopDark from "./assets/bg-desktop-dark.jpg";
import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";
import ovalLight from "./assets/Oval empty.svg";
import ovalDark from "./assets/Oveal dark empty.svg";
import X from "./assets/x.svg";
import { useState } from "react";

const App: React.FC = () => {
  const [dark, setDark] = useState(false);

  const changeMoudHandles = () => {
    setDark(!dark);
  };

  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.trim() !== "") {
      setItems((prevItems) => [...prevItems, input]);
      setInput("");
    }
  };

  const data: string[] = ["All", "Active", "Completed"];

  return (
    <>
      <Wrapper mode={dark}>
        <HeaderImgs src={dark ? DesktopLight : DesktopDark} alt="header img" />
        <ContentWrapper>
          <TiTleContainer>
            <h1>todo</h1>
            <button onClick={changeMoudHandles}>
              <img src={dark ? moon : sun} alt="img" />
            </button>
          </TiTleContainer>
          <div>
            <InputWrapper mode={dark}>
              <img src={dark ? ovalLight : ovalDark} alt="" />
              <input
                value={input}
                onChange={inputChange}
                onKeyDown={handleKeyDown}
                placeholder="Currently typing"
              />
            </InputWrapper>
            <Main>
              <TascWrapper>
                {items.map((item, index) => (
                  <TascContainer key={index} mode={dark}>
                    <div>
                      <img src={dark ? ovalLight : ovalDark} alt="img" />
                      <span>{item}</span>
                    </div>
                    <div>
                      <img src={X} />
                    </div>
                  </TascContainer>
                ))}
              </TascWrapper>
              <FooterWrapper mode={dark}>
                <span>{items.length} items left</span>
                <Datacontainer mode={dark}>
                  {data.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </Datacontainer>
                <ClearButton onClick={() => setItems([])}>
                  Clear Completed
                </ClearButton>
              </FooterWrapper>
            </Main>
          </div>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default App;

type WrapperProps = {
  mode: boolean;
};

const Wrapper = styled.div<WrapperProps>(
  (props) => css`
    width: 100%;
    position: relative;
    background: ${props.mode ? "white" : "black"};
  `
);

const HeaderImgs = styled.img`
  width: 100%;
  height: 290px;
`;
const ContentWrapper = styled.div`
  max-width: 540px;
  width: 100%;
  position: absolute;
  top: 12%;
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
  button {
    height: 45px;
    width: 45px;
    cursor: pointer;
    border: none;
    background: transparent;
  }
`;
type InputWrapperProps = {
  mode: boolean;
  children?: React.ReactNode;
};

const InputWrapper: React.FC<InputWrapperProps> = styled.div<InputWrapperProps>(
  (props) => css`
    border-radius: 5px;
    background: ${props.mode ? "#fff" : "#25273D"};
    box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5);
    padding: 20px 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    input {
      border: none;
      margin-left: 24px;
      color: ${props.mode ? "#393a4b" : "#fff"};
      font-size: 22px;
      letter-spacing: -0.25px;
      width: 100%;
      outline: none;
      background: transparent;
    }
  `
);

const Main = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5);
`;
//TascWrapper

const TascWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type TascContainerProps = {
  mode: boolean;
  children?: React.ReactNode;
};

const TascContainer: React.FC<TascContainerProps> =
  styled.div<TascContainerProps>(
    (props) => css`
      display: flex;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: ${props.mode ? "3px solid #e3e4f1" : "3px solid #393A4B"};
      display: flex;
      align-items: center;
      background: ${props.mode ? "#fff" : "#25273D"};

      color: ${props.mode ? "#494c6b" : "#C8CBE7"};
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.25px;
      img {
        margin-right: 24px;
        cursor: pointer;
      }
      button {
      }
    `
  );
//FooterWrapper

type FooterWrapperProps = {
  mode: boolean;
  children?: React.ReactNode;
};
const FooterWrapper: React.FC<FooterWrapperProps> =
  styled.div<FooterWrapperProps>(
    (props) => css`
      display: flex;
      justify-content: space-between;
      background: ${props.mode ? "#fff" : "#25273D"};
      padding: 16px 24px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.194px;
      color: ${props.mode ? "#9495A5" : "#5B5E7E"};
    `
  );

type DatacontainerProps = {
  mode: boolean;
  children?: React.ReactNode;
};
const Datacontainer: React.FC<DatacontainerProps> =
  styled.div<DatacontainerProps>(
    (props) => css`
      display: flex;
      column-gap: 20px;
      span {
        cursor: pointer;
        &:hover {
          color: ${props.mode ? "#494c6b" : "#FFF"};
        }
      }
    `
  );

const ClearButton = styled.span`
  cursor: pointer;
`;
