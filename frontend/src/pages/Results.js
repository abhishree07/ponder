import React from 'react';
// import Speech from 'react-speech';
import { FcSpeaker } from "react-icons/fc";
import { useSpeechSynthesis } from "react-speech-kit";

const Results = (props) => {

  const { code } = props;

  const [value, setValue] = React.useState("");
  const { speak } = useSpeechSynthesis();

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

        <div className='py-8 ml-12'>
          <button className='bg-secondary py-2 px-8 rounded-md text-xl md:text-2xl text-white' onClick={() => displayRazorpay(5)}>Pay amount</button>
        </div>

      </div>

    </>
  );
};

export default Results;
