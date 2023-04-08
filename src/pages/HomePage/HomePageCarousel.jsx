import React from 'react';
import './HomePageCarousel.css'

const HomePageCarousel = () => {
  const images = [
    "https://media.timeout.com/images/105623343/image.jpg",
    // "https://cdn.indesignlive.com/idlsg/wp-content/uploads/2017/11/web_GC_BPPL_ADULTS_CENTER-DISPLAY-01-1.jpg",
    // "https://www.nlb.gov.sg/main/-/media/NLBMedia/Images/Visit-Us/Libraries/CCKPL/Library-Images/Choa-Chu-Kang-Public-Library-Supplementary-Images-2-Story-Circle.jpeg",
  ];

  return (
            <div className="each-slide">
            <div>
                <img src={images[0]} />
            </div>
            <span className="image-caption">Credit: Unsplash/Fahrul Azmi</span>
            <p><img className="nlb-logo" src="https://i.ibb.co/KqcnGH7/nlblogo.jpg"></img>
            </p>
            </div>

  );
};

export default HomePageCarousel;




// import React from 'react';
// import { Fade } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';
// import './HomePageCarousel.css'
// import {Link} from "react-router-dom"

// const HomePageCarousel = () => {
//   const images = [
//     "https://media.timeout.com/images/105623343/image.jpg",
//     "https://cdn.indesignlive.com/idlsg/wp-content/uploads/2017/11/web_GC_BPPL_ADULTS_CENTER-DISPLAY-01-1.jpg",
//     "https://www.nlb.gov.sg/main/-/media/NLBMedia/Images/Visit-Us/Libraries/CCKPL/Library-Images/Choa-Chu-Kang-Public-Library-Supplementary-Images-2-Story-Circle.jpeg",
//   ];

//   return (
//     <div>
//         <Fade>
//             <div className="each-slide">
//             <div>
//                 <img src={images[0]} />
//             </div>
//             <span className="image-caption">Credit: Unsplash/Fahrul Azmi</span>
//             <p><img className="nlb-logo" src="https://i.ibb.co/KqcnGH7/nlblogo.jpg"></img>
//             </p>
//             </div>
//             <div className="each-slide">
//                 <p><Link to="/books/featured">
//                     <button className="futuristic-button">View<br/>all<br/>Featured</button>
//                     </Link>
//                 </p>
//             <div>
//                 <img src={images[1]} />
//             </div>
//             <span className="image-caption2">Credit: Andrew Phua Photos</span>
//             </div>
//             <div className="each-slide">
//             <div>
//                 <img src={images[2]} />
//             </div>
//             <span className="image-caption">Credit: National Library Board</span>
//             <p>
//             <span className="slide-text">   
//                 "I have a passion for teaching kids to become readers, to become comfortable with a book, not daunted. Books shouldn't be daunting, they should be funny, exciting and wonderful; and learning to be a reader gives a terrific advantage."
//             <br/><br/> <strong>ROALD DAHL</strong>
//             </span> 
//             <br/>
//             </p>
//             </div>
//         </Fade>
//     </div>
//   );
// };

// export default HomePageCarousel;





