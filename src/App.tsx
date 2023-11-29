import styled, { css } from "styled-components";
import DesktopLight from "./assets/bg-desktop-light.jpg";
import DesktopDark from "./assets/bg-desktop-dark.jpg";
import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";
import X from "./assets/x.svg";

import { useState, useEffect } from "react";
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

  const Checkbox: React.FC<CheckboxProps> = ({ type, onChange, checked }) => {
    return <StyledCheckbox type={type} onChange={onChange} checked={checked} />;
  };

  //Delete activity Mark done

  const checkboxHandler = (id: any) => {
    const newArr = todoList.slice();
    const indexOfObj = newArr.findIndex((item) => item.id === id);
    console.log(indexOfObj);
    if (indexOfObj >= 0) {
      newArr[indexOfObj].status = !newArr[indexOfObj].status;
      setTodoList(newArr);
    }
  };

  // delete from x
  const deleteTodo = (id: any) => {
    const newArr = todoList.slice();
    const indexOfObj = newArr.findIndex((item) => item.id === id);
    if (indexOfObj >= 0) {
      newArr.splice(indexOfObj, 1);
      setTodoList(newArr);
    }
  };
  // delete from Clear Completed cklick
  const deleteComleted = () => {
    const newArr = todoList.filter((item) => !item.status);
    setTodoList(newArr);
  };
  // filter left items
  const [filteredItems, setFilteredItems] = useState<YourItemType[]>([]);
  const [todoList, setTodoList] = useState<YourItemType[]>(() => {
    const storedData = localStorage.getItem("todoList");
    return storedData ? JSON.parse(storedData) : [];
  });
  
  const filterLeftItems = () => {
    const newArr = todoList.filter((item) => !item.status);
    setFilteredItems(newArr);
  };

  useEffect(() => {
    filterLeftItems();
  }, [todoList]);

  // filter with button
  const [filterType, setFilterType] = useState<string>("All");

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
  };

  const filterItems = (items: YourItemType[]): YourItemType[] => {
    switch (filterType) {
      case "Active":
        return items.filter((item) => !item.status);
      case "Completed":
        return items.filter((item) => item.status);
      default:
        return items;
    }
  };



  // Save data to local storage whenever todoList changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);
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
              <MainInput
                mode={dark}
                value={newTodo}
                onChange={inputChange}
                onKeyDown={handleKeyDown}
                placeholder="Currently typing"
              />
            </InputWrapper>
            <Main>
              <TascWrapper>
                {(filterItems(todoList) as YourItemType[]).map(
                  (item: YourItemType) => {
                    return (
                      <TascContainer key={item.id} mode={dark}>
                        <div>
                          <Checkbox
                            type="checkbox"
                            onChange={() => checkboxHandler(item.id)}
                            checked={item.status as boolean}
                            setCheckedStatus={(value) =>
                              setCheckedStatus(value)
                            }
                          />

                          <span>{item.description}</span>
                        </div>
                        <div>
                          <img onClick={() => deleteTodo(item.id)} src={X} />
                        </div>
                      </TascContainer>
                    );
                  }
                )}
              </TascWrapper>
              <FooterWrapper mode={dark}>
                <span>{filteredItems.length} items left</span>
                <Datacontainer mode={dark}>
                  {data.map((item, index) => (
                    <FilterButton
                      key={index}
                      onClick={() => handleFilterChange(item)}
                      active={
                        filterType === item ||
                        (filterType === "All" && item === "All")
                      }
                      lightMode={dark}
                    >
                      {item}
                    </FilterButton>
                  ))}
                </Datacontainer>
                <ClearButton mode={dark} onClick={deleteComleted}>
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

type MainInputProps = {
  mode: boolean;
};

const MainInput = styled.input<MainInputProps>(
  (props) => css`
    border: none;
    color: ${props.mode ? "#000" : "#fff"};
    font-size: 22px;
    letter-spacing: -0.25px;
    width: 100%;
    outline: none;
    background: transparent;
  `
);
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
const FilterButton = styled.span.attrs<{ lightMode: boolean }>((props) => ({
  lightMode: props.lightMode,
}))<{ active: boolean; lightMode: boolean }>`
  color: ${(props) =>
    props.lightMode
      ? props.active
        ? "#3A7CFD"
        : "#494C6B"
      : props.active
      ? "#3A7CFD"
      : "#5B5E7E"};
`;
type ClearButtonProps = {
  mode: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

const ClearButton: React.FC<ClearButtonProps> = styled.div<ClearButtonProps>(
  (props) => css`
    cursor: pointer;
    color: ${props.mode ? "#9495A5" : "#5B5E7E"};
    &:hover {
      color: ${props.mode ? "#494C6B" : "#E3E4F1"};
    }
  `
);
