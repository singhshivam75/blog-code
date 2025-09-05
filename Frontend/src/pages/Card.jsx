import React from 'react'
import Card from '../components/Card';
import image from "../assets/heroSection-bg.png";
import image1 from "../assets/photo-1504674900247-0877df9cc836.jpg";
import image2 from "../assets/photo-1512820790803-83ca734da794.jpg";

const CardCon = () => {
  return (
    <div className='flex items-center justify-center'>
      <Card
        title={"World's Biggest University"}
        description={"Making website is now one of the easiest thing in the world. You just need to learn HTML, CSS, JavaScript and you are good to go."}
        image={image}
        auther={"Shivam"}
        date={"27-08-2025"}
      />
      <Card
        title={"World's Biggest University"}
        description={"Making website is now one of the easiest thing in the world. You just need to learn HTML, CSS, JavaScript and you are good to go."}
        image={image1}
        auther={"Shivam"}
        date={"27-08-2025"}
      />
      <Card
        title={"World Class Library"}
        description={"Indulge your taste buds with our delightful and nutritious cuisine. Fuel for both body and mind."}
        image={image2}
        auther={"Shivam"}
        date={"27-08-2025"}
      />
    </div>
  )
}

export default CardCon
