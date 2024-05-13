import Carousel from 'react-bootstrap/Carousel';
import firstimg from '../Assets/s1.png';
import secondimg from '../Assets/s2.png';
import thirdimg from '../Assets/s3.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={secondimg} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={firstimg } alt="Second slide" />
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
