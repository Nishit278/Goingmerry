import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailContainer">
        <input className="mailInput" type="mail" placeholder="Your Email" />
        <button className="mailBtn">Subscribe</button>
      </div>
    </div>
  );
}

export default MailList