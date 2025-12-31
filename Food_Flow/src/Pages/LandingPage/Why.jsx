import "./Why.css";
import WhyImg from "../../assets/Why.jpg";


export default function Why() {
  return (
    <>
      <div id="Grid">
        <div id="Text">
          <h1>Why ?</h1>
          <ul>
            <li>
              Food redistribution helps reduce food waste and combat hunger by
              distributing surplus food to those in need.
            </li>
            <li>
            It acts as a comprehensive platform connecting customers with restaurants
            </li>
            <li>
            Provides restaurants with industry-specific marketing tools
            </li>
          </ul>
          <h1>Impact !</h1>
          <ul>
            <li>
            Allows users to discover new cuisines, restaurants, and unique dining experiences
              </li>
              <li>Supports nutrition and well-being in underprivileged communities.
              Saves businesses money and creates job opportunities in food
              recovery.
            </li>
          </ul>
        </div>
        <div id="Image">
          <img src={WhyImg}></img>
        </div>
      </div>
    </>
  );
}
