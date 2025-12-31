import "./Whygrid.css";
import Why1 from "../../assets/whygrid1.jpg";
import Why2 from "../../assets/key1.jpg";

export default function WhyGrid() {
  return (
    <>
      <div className="whygrid">
        <div className="whygrid1">
          <div className="whygridimg">
            <img src={Why2} />
          </div>
          <div className="whygridtext1">
            <h1>Key Approaches</h1>
            <br></br>
            <br></br>
            <ol>
              <li>
              Using an AI-powered chatbot, it provides personalized food recommendations based on cuisine preferences, spice levels, meal types, and dietary needs.
              </li>
              <li>
                Food banks collect large quantities of excess food and
                distribute it to local pantries and shelters, while community
                fridges provide an accessible way for individuals to donate and
                take food as needed.
              </li>
              <li>
              Food banks, pantries, and community fridges serve as essential
              channels for surplus food distribution.
              </li>
            </ol>
          </div>
        </div>
        <div className="whygrid2">
          <div className="whygridimg2">
            <img src={Why1}></img>
          </div>
          <div className="whygridtext2">
            <h1>Challenges and Future Prospects</h1>
            <ol>
              <li>
                Issues like logistics, food safety, and infrastructure need
                solutions.
              </li>
              <li>
                Advanced technologies like blockchain and AI can enhance
                efficiency.
              </li>
              <li>
                Coordinated efforts from governments, businesses, and
                communities are essential.
              </li>
              <li>
                Food redistribution is key to sustainability, tackling hunger,
                and promoting economic stability.
              </li>
              <li>
                Continued innovation can make a lasting impact on society and
                the planet.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
