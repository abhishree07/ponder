import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
// import Speech from 'react-speech';
import { FcSpeaker } from "react-icons/fc";
import { Menu, Transition } from '@headlessui/react'
import { useSpeechSynthesis } from "react-speech-kit";

const Results = (props) => {

  const { code } = props;

  const [value, setValue] = React.useState("");
  const { speak } = useSpeechSynthesis();

  // For  changing the language
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [selectedLanguageKey, setLanguageKey] = useState('')
  const [languagesList, setLanguagesList] = useState([])
  const [detectLanguageKey, setdetectedLanguageKey] = useState('')


  // var formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "INR",
  //   minimumFractionDigits: 0,
  // });

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "Enter_you_API_here",
      currency: "INR",
      amount: amount * 100,
      name: "Don't Dis My Ability",
      description: "Thanks for purchasing",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
      },
      prefill: {
        name: "Don't Dis My Ability",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // For changing the language
  const getLanguageSource = () => {
    axios.post(`https://libretranslate.de/detect`, {
      q: inputText
    })
      .then((response) => {
        console.log(response.data[0].language)
      })
  }
  const translateText = () => {
    setResultText(inputText)

    getLanguageSource();

    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey
    }
    axios.post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setResultText(response.data.translatedText)
      })
  }

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value)
  }

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`)
      .then((response) => {
        setLanguagesList(response.data)
      })

    getLanguageSource()
  }, [inputText])

  return (
    <>
      <div className="min-h-screen mt-10 text-2xl">
        <div className="bg-white p-6 rounded-md mx-12">
          <div className="flex flex-row gap-2 pb-4">
            <div className="bg-red-500 h-4 w-4 rounded-full"></div>
            <div className="bg-yellow-500 h-4 w-4 rounded-full"></div>
            <div className="bg-green-500 h-4 w-4 rounded-full"></div>
          </div>

          <textarea
            rows="10"
            value={code}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border-none active:border-none resize-none h-full"
          ></textarea>

          {/* {code} */}

          <div className='flex flex-row '>
            <button onClick={() => speak({ text: value })}><FcSpeaker className="h-8" /></button>
            {/* <button>
              <FcSpeaker className="h-8" />
              <Speech text={code} stop={true}
                pause={true}
                resume={true}
                className="cursor-pointer z-10 w-8 h-1" />
            </button> */}
          </div>

        </div>

        <div className='grid place-items-center py-8'>
          <Menu as="div" className="relative inline-block text-left" onChange={languageKey}>
            <div>
              <Menu.Button className="my-1 inline-flex justify-center w-60 py-2 px-4 text-xl font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md font-sourceSerifPro hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                Change Language
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items static className="origin-top-right absolute right-0 w-60 rounded-md shadow-lg bg-white ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                {languagesList.map((language) => {
                  return (
                    <Menu.Item>
                      <div className="w-full py-3 text-sm cursor-pointer text-center" value={language.code}>
                        {language.name}
                      </div>
                    </Menu.Item>
                  )
                })}

              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="bg-white p-6 rounded-md mx-12">
          <div className="flex flex-row gap-2 pb-4">
            <div className="bg-red-500 h-4 w-4 rounded-full"></div>
            <div className="bg-yellow-500 h-4 w-4 rounded-full"></div>
            <div className="bg-green-500 h-4 w-4 rounded-full"></div>
          </div>

          <textarea
            rows="10"
            value={resultText}
            className="w-full border-none active:border-none resize-none h-full"
          ></textarea>

        </div>

        <div className='grid place-items-center py-8'>
          <button className='bg-secondary py-2 px-8 rounded-md text-xl md:text-2xl text-white w-60' onClick={translateText}>Translate</button>
        </div>

        <div className='py-8 ml-12'>
          <button className='bg-secondary py-2 px-8 rounded-md text-xl md:text-2xl text-white' onClick={() => displayRazorpay(5)}>Pay amount</button>
        </div>

      </div>

    </>
  );
};

export default Results;
