import useFetch from "../../hooks/useFetch";
import "./featured.css";
const Featured = () => {
  const { data, loading, err } = useFetch(
    "/api/hotels/countByCity?cities=New Delhi,Manali,Bangalore,Goa"
  );
  // console.log(data)
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/region/square250/49646.webp?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Goa</h2>
              <h2>{data[3]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>New Delhi</h2>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Bangalore</h2>
              <h2>{data[2]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/684716.webp?k=4c3f55236cffa6597afa0ef11a9f012636f535bf9cc6c0e2ed8142e01fa14766&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Manali</h2>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
