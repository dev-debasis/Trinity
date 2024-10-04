import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import headerImg from "../assets/images/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen'; 

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["WebSnap", "UserGen", "PDF QR"];
  const period = 2000;

  
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/signup`; 
    navigate(path);
  }
  return (
    <section className="banner bg-gradient-to-b from-gray-800 to-gray-900 py-12" id="home">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 xl:w-7/12">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="text-lg text-blue-400 uppercase">Welcome to our Web App</span>
                  <h1 className="text-4xl font-bold text-white">
                    {`From Team HackOver !`}{" "}
                    <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "WebSnap", "UserGen", "PDF QR" ]'>
                      <span className="text-blue-400">{text}</span>
                    </span>
                  </h1>
                  <p className="text-gray-300 mt-4">
                  Our project is an all-in-one web solution that allows users to capture full-page website screenshots, generate random user data in CSV format, and create PDFs embedded with QR codes for seamless data sharing and verification.
                  </p>
                  <button
                    onClick={ routeChange }
                    className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Sign up / Sign in <ArrowRightCircle size={25} className="inline-block ml-2" />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </div>
          <div className="w-full md:w-1/2 xl:w-5/12 mt-8 md:mt-0">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" className="mx-auto h-60 md:h-80" />
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
  );
};
