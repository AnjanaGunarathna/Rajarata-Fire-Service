import Carousel from 'react-bootstrap/Carousel';
import firstimg from '../Assets/fireasset/s1.png';
import secondimg from '../Assets/fireasset/s2.jpg';
import thirdimg from '../Assets/fireasset/s3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';


function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={firstimg} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={secondimg} alt="Second slide" />
        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={thirdimg} alt="Third slide" />
        <Carousel.Caption>
          
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
