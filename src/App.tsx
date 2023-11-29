import styled, { css } from "styled-components";
import DesktopLight from "./assets/bg-desktop-light.jpg";
import DesktopDark from "./assets/bg-desktop-dark.jpg";
import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";
import ovalLight from "./assets/Oval empty.svg";
import ovalDark from "./assets/Oveal dark empty.svg";
import X from "./assets/x.svg";
import ovalCheck from "./assets/Check.svg";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  //dark mode
  const [dark, setDark] = useState(false);
  const changeMoudHandles = () => {
    setDark(!dark);
  };

  //input
  const data: string[] = ["All", "Active", "Completed"];

  interface YourItemType {
    id: number | string;
    description: string;
    active: boolean;
    status: boolean | string;
    indexOfObj: number;
    value: "";
  }

  const [newTodo, setNewTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<YourItemType[]>([]);

  const [checkedStatus, setCheckedStatus] = useState(false);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const listId = uuidv4();
    if (event.key === "Enter") {
      setTodoList([
        ...todoList,
        {
          id: listId,
          description: newTodo,
          active: checkedStatus,
          status: checkedStatus,
          indexOfObj: todoList.length,
          value: "",
        },
      ]);
      setNewTodo("");
      setCheckedStatus(false);
    }
  };

  interface CheckboxProps {
    type: string;
    onChange: () => void;
    checked: boolean;
    setCheckedStatus: (value: boolean) => void;
  }

  const Checkbox: React.FC<CheckboxProps> = ({
    type,
    onChange,
    checked,
    setCheckedStatus,
  }) => {
    return (
      <StyledCheckbox
        type={type}
        onChange={onChange}
        checked={checked}
        // Other attributes as needed
      />
    );
  };

  // აქტიურობის წაშლა მონიშვნა შესრულებულად
  const checkboxHandler = (id: any) => {
    const newArr = todoList.slice();
    const indexOfObj = newArr.findIndex((item) => item.id === id);
    console.log(indexOfObj);
    if (indexOfObj >= 0) {
      newArr[indexOfObj].status = !newArr[indexOfObj].status;
      setTodoList(newArr);
    }
  };

  const deleteTodo = (id: any) => {
    const newArr = todoList.slice();
    const indexOfObj =  newArr.findIndex((item) => item.id === id);
    if (indexOfObj >= 0) {
      newArr.splice(indexOfObj, 1);
      setTodoList( newArr);
    }
  };
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
              <Checkbox
                type="checkbox"
                onChange={() => setCheckedStatus(!checkedStatus)}
                checked={checkedStatus}
                setCheckedStatus={(value) => setCheckedStatus(value)}
              />
              {/* <img src={dark ? ovalLight : ovalDark} alt="" /> */}
              <MainInput
                value={newTodo}
                onChange={inputChange}
                onKeyDown={handleKeyDown}
                placeholder="Currently typing"
              />
            </InputWrapper>
            <Main>
              <TascWrapper>
                {(todoList as YourItemType[]).map((item: YourItemType) => {
                  return (
                    <TascContainer
                      key={item.id}
                      mode={dark}
                      // className={item.active ? "active" : "inactive"}
                    >
                      <div>
                        <Checkbox
                          type="checkbox"
                          onChange={() => checkboxHandler(item.id)}
                          checked={item.status as boolean}
                          setCheckedStatus={(value) => setCheckedStatus(value)}
                        />
                        {/* <img
                          setCheckedStatus={() =>
                            setCheckedStatus(!checkedStatus)
                          }
                          src={dark ? ovalLight : ovalDark}
                          alt="img"
                        /> */}
                        <span>{item.description}</span>
                      </div>
                      <div>
                        <img onClick={() => deleteTodo(item.id)} src={X} />
                      </div>
                    </TascContainer>
                  );
                })}
              </TascWrapper>
              <FooterWrapper mode={dark}>
                <span>{todoList.length} items left</span>
                <Datacontainer mode={dark}>
                  {data.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </Datacontainer>
                <ClearButton onClick={() => setTodoList([])}>
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
  `
);
const MainInput = styled.input`
  border: none;
  color: #fff;
  font-size: 22px;
  letter-spacing: -0.25px;
  width: 100%;
  outline: none;
  background: transparent;
`;
const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 1px solid blue;
  margin-right: 24px;
`;

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
        display: none;
      }
      &:hover img {
        display: block;
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
