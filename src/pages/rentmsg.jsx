import React, { useState, useEffect, useRef } from 'react';
import RawData from './RawData';
import Toast from './Toast';
import { motion } from 'framer-motion';

const RentMsg = () => {
  const theadRef = useRef(null);
  const tbodyRef = useRef(null);
  const [theadWidth, setTheadWidth] = useState('auto');
  const [toast, setToast] = useState(['', 0]);

  // 初始化状态时读取 local storage
  const [checkedState, setCheckedState] = useState(
    RawData.map(
      (item) =>
        JSON.parse(localStorage.getItem(item['property address'])) || false,
    ),
  );

  useEffect(() => {
    if (tbodyRef.current) {
      const tbodyWidth = tbodyRef.current.scrollWidth;
      setTheadWidth(tbodyWidth + 'px');
    }
  }, [RawData]);

  useEffect(() => {
    // 当 checkedState 更新时，保存到 local storage
    checkedState.forEach((checked, index) => {
      localStorage.setItem(
        RawData[index]['property address'],
        JSON.stringify(checked),
      );
    });
  }, [checkedState]);

  const handleRowClick = (index, item) => {
    const emailContent = generateEmail(item);
    const updatedCheckedState = checkedState.map((checked, i) =>
      i === index ? !checked : checked,
    );
    setCheckedState(updatedCheckedState);

    if (!checkedState[index]) {
      navigator.clipboard.writeText(emailContent).then(() => {
        setToast(['Copy Successfully :)', 1000]);
        setTimeout(() => {
          setToast(['', 0]);
        }, 3000);
      });
    }
  };

  const generateEmail = (item) => {
    return `
Hello ${item.Agent},

My name is ${item.Sender}, and my friend and I have just graduated from UNSW. 
We are very interested in renting the property at 📍${item['property address']}.

We have a few questions to ensure the property meets our needs:

   - What is the earliest time we can inspect the property and move in? 🕰️
   - Could you please let us know the maximum length of the contract available? 📜
   - I see that the rent is ${item.Rent} per week. Are there any additional 
     costs not included in this amount? Also, if we sign a long-term lease, would 
     there be any possibility of a discount? 💰
   - Additionally, is there a video available for viewing the property? 📹
   
Thank you very much for your time and assistance.😊 We are very interested in this 
property and look forward to hearing from you soon so we can proceed further.🌟

Kind regards,
${item.Sender}
    `;
  };

  return (
    <div className='relative w-full overflow-x-auto shadow-md sm:rounded-lg'>
      <p className='flex justify-center w-full px-6 py-3 text-xl text-center'>
        欢迎访问受保护的页面
      </p>
      <table className='relative w-full text-left text-gray-500 rtl:text-right darrk:text-gray-400'>
        <thead
          ref={theadRef}
          className='text-[20px] bg-sky-700 text-sky-100 uppercase darrk:bg-gray-700 darrk:text-gray-400 fixed top-0 z-10 w-full'
        >
          <tr className=''>
            <th scope='col' className='p-4 w-[3%]'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  className='w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 darrk:focus:ring-blue-600 darrk:ring-offset-gray-800 darrk:focus:ring-offset-gray-800 focus:ring-2 darrk:bg-gray-700 darrk:border-gray-600'
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' className='px-6 py-3 text-center w-[7%]'>
              Index
            </th>
            <th scope='col' className='px-6 py-3 text-center w-[20%]'>
              Property Address
            </th>
            <th scope='col' className='px-6 py-3 text-center flex-1 w-[70%]'>
              Message
            </th>
          </tr>
        </thead>

        <tbody ref={tbodyRef}>
          {RawData.map((item, index) => (
            <tr
              key={index}
              className='border-b text-[20px] darrk:bg-gray-800 darrk:border-gray-700 hover:bg-sky-50 darrk:hover:bg-gray-600 w-[1%]'
            >
              <td className='p-4'>
                <div className='flex items-center'>
                  <input
                    id={`checkbox-table-search-${index}`}
                    checked={checkedState[index]}
                    onChange={() => handleRowClick(index, item)}
                    type='checkbox'
                    className='w-8 h-8 text-green-600 bg-green-100 border-gray-300 rounded-full darrk:focus:ring-green-600 darrk:ring-offset-green-800 darrk:focus:ring-offset-green-800 focus:ring-2 darrk:bg-green-700 darrk:border-green-600'
                  />
                </div>
              </td>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap darrk:text-white text-center w-[7%]'>
                {index + 1}
              </td>
              <td className='gap-y-[30px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap darrk:text-white w-[7%]'>
                <a
                  href={item['Oringinal Link']}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 darrk:text-blue-400'
                >
                  {item['property address']}
                </a>
              </td>
              <td className='px-6 py-4 text-left text-base w-[70%]'>
                <pre>{generateEmail(item)}</pre>

                <motion.button
                  layout
                  type='button'
                  onClick={() => handleRowClick(index, item)}
                  className={`flex justify-center items-center text-white bg-gradient-to-r ${checkedState[index] ? 'bg-gray-400 w-auto hover:from-sky-500 hover:via-sky-600 hover:to-sky-700' : 'w-full from-sky-500 via-sky-600 to-sky-700'} hover:bg-gradient-to-br darrk:focus:ring-sky-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2`}
                >
                  {checkedState[index]
                    ? 'Mark as UNFINISH'
                    : 'COPY Message and Mark as FINISH'}
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toast message={toast[0]} duration={toast[1]} />
    </div>
  );
};

export default RentMsg;
