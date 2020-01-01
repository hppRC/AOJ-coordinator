import { Link } from 'gatsby';
import React, { useRef } from 'react';
import { animated, config, useSpring, useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { AOJContainer, FirebaseAuthContainer } from 'src/store';

import styled from '@emotion/styled';

const AOJContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();

  return (
    <section className={className}>
      {user ? <StyledLoginContents /> : <StyledLogoutContents />}
    </section>
  );
};

const LoginContents: React.FCX = ({ className }) => {
  const { user } = FirebaseAuthContainer.useContainer();
  const { aojUser, setAOJUserOnFirestore } = AOJContainer.useContainer();

  const userNameRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!user || !userNameRef.current?.value.trim()) return;
    //名前が保存されてるものと違う場合のみsetする,同じなら書き込み直す必要が無いので早期return
    if (aojUser?.id === userNameRef.current.value) {
      userNameRef.current.value = '';
      return;
    }
    try {
      await setAOJUserOnFirestore(userNameRef.current.value);
    } catch (error) {
      console.error(error);
    }
    //現在の値を消すのは全てが終わってからにしよう！👲
    userNameRef.current.value = '';
  };

  const contents = [
    <Link to='/presenter'>
      <h2>Problem Presenter</h2>
    </Link>,
    <Link to='/'>
      <h2>comming soon!</h2>
    </Link>,
    <Link to='/'>
      <h2>comming soon!</h2>
    </Link>
  ];

  const [springs, set] = useSprings(contents.length, idx => ({
    config: config.wobbly,
    transform: 'scale(1)'
  }));

  return (
    <section className={className}>
      <h2>{aojUser?.id ?? 'Who are you?'}</h2>
      <span>{aojUser ? 'change user name?' : 'input user name'}</span>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          id='userName'
          ref={userNameRef}
          placeholder='AOJ User Id'
        />
        <button type='submit'>submit</button>
      </form>
      <div>
        {springs.map((item: any, idx: any) => (
          <animated.section
            key={idx}
            onMouseEnter={() =>
              set((i: any) => (i === idx ? { transform: 'scale(1.2)' } : {}))
            }
            onMouseLeave={() =>
              set((i: any) => (i === idx ? { transform: 'scale(1)' } : {}))
            }
            style={item}
          >
            {contents[idx]}
          </animated.section>
        ))}
      </div>
    </section>
  );
};

const StyledLoginContents = styled(LoginContents)`
  display: flex;
  flex-flow: column;
  padding: 5rem 0;

  h2 {
    font-size: 3rem;
    padding-bottom: 2rem;
  }

  span {
    padding: 1rem 0 1rem 2rem;
  }

  form {
    padding: 0 3rem;

    input {
      padding: 0.3rem;
      border: 1px solid #030027;
      border-radius: 5px;
      margin-right: 2rem;
      transition: border 0.3s;

      :hover {
        border: 1px solid #03002750;
      }
    }

    button {
      border-radius: 5px;
      padding: 0.5rem 1rem;
      color: #fff;
      background-color: #030027;

      transition: opacity, transform 0.3s;

      :hover {
        opacity: 0.9;
        transform: scale(1.2);
      }
    }
  }

  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 30vh);
    grid-row-gap: 6vh;
    justify-content: space-around;
    padding: 5rem 0;

    > section {
      z-index: 0;
      border-radius: 5px;
      box-shadow: 0 0 3px 3px #03002720;
      width: 30vh;
      height: 30vh;
      background-color: #fff;
      pointer-events: none;
      will-change: transform;
      a {
        display: flex;
        width: 100%;
        height: 100%;
        color: #030027;
        pointer-events: auto;
        text-decoration: none;
        justify-content: center;
        align-items: center;

        h2 {
          word-break: keep-all;
        }
      }
    }
  }
  @media screen and (max-width: 1100px) {
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    padding: 0 0 5rem 0;

    h2 {
      padding: 0;
    }

    div {
      grid-template-columns: repeat(1, 1fr);

      > section {
        width: 100%;
      }
    }
  }

  @media screen and (max-height: 430px) {
    div {
      grid-template-columns: repeat(1, 1fr);

      > section {
        width: 100%;
      }
    }
  }
`;

const LogoutContents: React.FCX = ({ className }) => {
  const texts = [
    ...'AOJCoordinatorはAOJ関連の色々をいい感じになんやかんやするサービスです'
  ];

  return (
    <div className={className}>
      <h2>
        AOJCoordinatorはAOJ関連の色々をいい感じになんやかんやするサービスです
      </h2>
      {texts.map((text: string, i: number) => (
        <React.Fragment key={i}>
          <Block text={text} key={i} />
        </React.Fragment>
      ))}
    </div>
  );
};

const Block: React.FCX<{ text: string }> = ({ text }) => {
  const [{ x, y }, set] = useSpring(() => ({
    config: config.gentle,
    x: 0,
    y: 0
  }));
  const bind = useDrag(({ offset: [x, y] }) => {
    set({ x, y });
  });
  return (
    <animated.h2 {...bind()} style={{ x, y }}>
      {text}
    </animated.h2>
  );
};

const StyledLogoutContents = styled(LogoutContents)`
  display: flex;
  justify-content: center;
  align-items: baseline;
  h2 {
    font-size: 3rem;
    cursor: pointer;
    user-select: none;
  }

  h2:nth-of-type(1) {
    display: none;
  }

  h2:nth-of-type(4) {
    padding-right: 1rem;
  }

  @media screen and (max-width: 1100px) {
    h2 {
      font-size: 2.6rem;
    }
  }
  @media screen and (max-width: 950px) {
    h2 {
      display: none;
    }
    h2:nth-of-type(1) {
      display: inline;
      font-size: 2.5rem;
    }
  }

  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    h2:nth-of-type(1) {
      font-size: 1.8rem;
    }
  }
  @media screen and (max-height: 430px) {
    h2 {
      display: none;
    }
    h2:nth-of-type(1) {
      display: inline;
      font-size: 1.8rem;
    }
  }
`;

export const StyledAOJContents = styled(AOJContents)``;

export default StyledAOJContents;
