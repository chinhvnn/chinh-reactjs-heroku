import React from "react";
import classNames from "classnames"

class CitiesSlider extends React.Component {
    constructor(props) {
      super(props);
      
      this.IMAGE_PARTS = 4;
      
      this.changeTO = null;
      this.AUTOCHANGE_TIME = 4000;
      
      this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
      
      this.slides = [
        {
          city: 'Paris',
          country: 'France',
          img: './img/slider/paris.jpg',
        },
        {
          city: 'Singapore',
          img: './img/slider/singapore.jpg',
        },
        {
          city: 'Prague',
          country: 'Czech Republic',
          img: './img/slider/prague.jpg',
        },
        {
          city: 'Amsterdam',
          country: 'Netherlands',
          img: './img/slider/amsterdam.jpg',
        },
        {
          city: 'Moscow',
          country: 'Russia',
          img: './img/slider/moscow.jpg',
        },
      ];

    }
    
    componentWillUnmount() {
      window.clearTimeout(this.changeTO);
    }
    
    componentDidMount() {
      this.runAutochangeTO();
      setTimeout(() => {
        this.setState({ activeSlide: 0, sliderReady: true });
      }, 0);
    }
    
    runAutochangeTO() {
      this.changeTO = setTimeout(() => {
        this.changeSlides(1);
        this.runAutochangeTO();
      }, this.AUTOCHANGE_TIME);
    }
    
    changeSlides(change) {
      window.clearTimeout(this.changeTO);
      const length = this.slides.length;
      const prevSlide = this.state.activeSlide;
      let activeSlide = prevSlide + change;
      if (activeSlide < 0) activeSlide = length - 1;
      if (activeSlide >= length) activeSlide = 0;
      this.setState({ activeSlide, prevSlide });
    }
    
    render() {
      const { activeSlide, prevSlide, sliderReady } = this.state;
      return (
        <div className={classNames('slider', { 's--ready': sliderReady })}>
          <p className="slider__top-heading">Travelers</p>
          <div className="slider__slides">

            {this.slides.map((slide, index) => (
              <div
                key={slide.city}
                className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
                >
                <div className="slider__slide-content">
                  <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                  <h2 className="slider__slide-heading">
                    {slide.city.split('').map((char, i) => <span key={i}>{char}</span>)}
                  </h2>
                  <a href="/products"><p className="slider__slide-readmore">read more </p></a>
                </div>
                <div className="slider__slide-parts">
                  {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                    <div key={i} className="slider__slide-part">
                      <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="slider__control" onClick={() => this.changeSlides(-1)} />
          <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
        </div>
      );
    }
  }
  
  
  
  export default CitiesSlider;
  // ReactDOM.render(<CitiesSlider slides={slides} />, document.querySelector('#app'));
  