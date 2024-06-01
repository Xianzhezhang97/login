import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Rentmsg from './rentmsg';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const correctPassword = 'rent';
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      if (rememberMe) {
        const token = 'user-token';
        localStorage.setItem('authToken', token);
      }
    } else {
      alert('密码错误，请重试');
    }
  };

  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  if (isAuthenticated) {
    return (
      <div>
        <Rentmsg />
      </div>
    );
  }

  return (
    <div className='bg-slate-400'>
      <section
        id='login'
        className='z-50 w-full h-full ease-in-out bg-gray-50 dark:bg-gray-900 '
      >
        <img
          src='https://a0.muscache.com/im/pictures/6481d1e8-a4d9-4f24-99e7-efccefb9132d.jpg?im_w=1200'
          className='absolute object-cover object-left-bottom w-full h-full'
        ></img>
        <div className='absolute inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 glass-effect'>
          <div className='flex flex-col items-center justify-center mx-8 bg-white rounded-[28px] overflow-hidden shadow sm:mx-4 lg:py-0'>
            <div className='flex items-center justify-between duration-700 ease-in-out shadow '>
              <img
                src='https://3o.hk/images/2024/05/22/IMG_08952.md.png'
                className='hidden object-cover h-full rounded-l-lg w-52 md:flex'
              ></img>
              <div className='flex flex-col w-96 p-[28px]'>
                <div className='flex items-center justify-center w-full'>
                  <a
                    href='https://xianzhe.site/'
                    className='flex justify-center pt-8'
                  >
                    <span className='mr-2 logo vertical-center '>
                      <i className='fi fi-brands-airbnb'></i>
                    </span>
                    <h1>
                      <span className='self-center text-3xl font-semibold text-transparent vertical-center hide-on-small-screen whitespace-nowrap dark:text-white bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
                        WorkBench System
                      </span>
                    </h1>
                  </a>
                </div>
                <div className='w-full dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                  <div className='p-6 gap-y-4 md:gap-y-6 sm:p-8'>
                    <h5 className='flex justify-start hidden text-xl font-bold leading-tight tracking-tight text-gray-400 dark:text-white'>
                      Login now
                    </h5>
                    <form
                      className='space-y-6 md:space-y-6'
                      onSubmit={handleSubmit}
                    >
                      <div>
                        <label
                          htmlFor='loginEmail'
                          className='block mb-2 text-base font-medium text-gray-900 dark:text-white'
                        >
                          Account
                        </label>
                        <input
                          // type='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Account'
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='loginPassword'
                          className='block mb-2 text-base font-medium text-gray-900 dark:text-white'
                        >
                          Password
                        </label>
                        <div>
                          <div className='relative w-full'>
                            <input
                              type={visible ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className='pr-8 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              placeholder='Password'
                              required
                            />
                            <div
                              type='button'
                              className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                              onClick={handleChange}
                            >
                              {visible ? (
                                <i className='fi fi-sr-eye'></i>
                              ) : (
                                <i className='fi fi-rr-eye-crossed'></i>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => setRememberMe(!rememberMe)}
                        className='flex items-start'
                      >
                        <div className='flex items-center h-5'>
                          <input
                            aria-describedby='terms'
                            type='checkbox'
                            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                            required=''
                          />
                        </div>
                        <div className='mb-6 ml-3 text-sm'>
                          <label
                            className='font-light text-gray-500 dark:text-gray-300'
                            required
                          >
                            Remember your password{'  '}
                          </label>
                        </div>
                      </div>
                      <button
                        type='submit'
                        className='w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      >
                        Log in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
