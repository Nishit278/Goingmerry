import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import AuthContext from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  //  console.log(location);
  const id = location.pathname.split("/")[2];
  // console.log(id);
  const { data, error, loading, reFetch } = useFetch(`/api/hotels/find/${id}`);
  // console.log(data);
  let { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const d1 = new Date(dates[0].startDate);
  const d2 = new Date(dates[0].endDate);
  const nights = dayDifference(d1, d2);
  // console.log(nights);
  // console.log(dates[0].startDate, dates[0].endDate)
  const price = nights * data.cheapestPrice * 78 * options.room;
  // console.log(data.cheapestPrice, options.room);

  //modal handler
  const handleClick = () => {
    reFetch();
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.name}</span>
              </div>
              <span className="hotelDistance">
                {`Excellent Location ${data.distance}- m from center`}
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over $112 at this property and get a free airport
                taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo) => (
                  <div className="hotelImgWrapper" key={photo}>
                    <img src={photo} alt="" className="hotelImg" />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {nights}-night stay</h1>
                  <span>
                    Located in the real heart of New Delhi, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>₹{numberWithCommas(price)}</b>({nights} nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        </>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
