import React, { useState, useEffect } from "react";
import "./ChatBot.css";
import { useNavigate } from "react-router-dom";

const subcategories = {
  Perishable: [
    "Dairy Products",
    "Fruits & Vegetables",
    "Meat & Poultry",
    "Seafood",
    "Eggs",
  ],
  "Semi-Perishable": ["Bakery Items", "Cooked Food", "Soft Cheeses"],
};



const categoryQuestions = {
  "Dairy Products": [
    {
      key: "expiry_date",
      text: "What is the expiry date mentioned on the package?",
      type: "date",
    },
    {
      key: "stored_below_5C",
      text: "Has it been stored below 5°C (41°F)?",
      type: "yesno",
    },
    { key: "discoloration", text: "Any discoloration or mold?", type: "yesno" },
    {
      key: "curdling",
      text: "Is there any separation or curdling in milk-based products?",
      type: "yesno",
    },
    {
      key: "slimy",
      text: "Is the texture clumpy, slimy, or excessively thick",
      type: "yesno",
    },
    { key: "smell_test", text: "Does it smell sour or off?", type: "yesno" },
  ],
  "Fruits & Vegetables": [
    {
      key: "visible_mold",
      text: "Do you see any mold or unusual spots?",
      type: "yesno",
    },
    {
      key: "texture_soft",
      text: "Is the texture too soft, mushy, or slimy?",
      type: "yesno",
    },
    {
      key: "wrinkles",
      text: "Are there any wrinkles or excessive dryness?",
      type: "yesno",
    },
    {
      key: "packing",
      text: "Is there excessive moisture or condensation inside the packaging?",
      type: "yesno",
    },
    {
      key: "bad_smell",
      text: "Does it have a sour or unpleasant smell?",
      type: "yesno",
    },
  ],
  "Meat & Poultry": [
    {
      key: "stored_below_5C",
      text: "Has the meat been stored below 5°C (41°F)?",
      type: "yesno",
    },
    {
      key: "color_change",
      text: "Has the color changed to gray or green?",
      type: "yesno",
    },
    {
      key: "slimy_texture",
      text: "Does it feel slimy or sticky?",
      type: "yesno",
    },
    {
      key: "bloated",
      text: "Is the packaging bloated, leaking, or damaged?",
      type: "yesno",
    },
    {
      key: "bad_smell",
      text: "Does it have a strong, unpleasant smell?",
      type: "yesno",
    },
  ],
  Seafood: [
    {
      key: "stored_below_5C",
      text: "Has the seafood been stored below 5°C (41°F)?",
      type: "yesno",
    },
    {
      key: "fishy_smell",
      text: "Does it have a strong, ammonia-like fishy smell?",
      type: "yesno",
    },
    {
      key: "texture_change",
      text: "Is the texture slimy or mushy?",
      type: "yesno",
    },
    {
      key: "thawed",
      text: "For frozen seafood: Was it thawed and refrozen?",
      type: "yesno",
    },
    {
      key: "color_change",
      text: "Has the color changed (e.g., grayish, dull, or yellowish)?",
      type: "yesno",
    },
  ],
  Eggs: [
    {
      key: "egg_floats",
      text: "Does the egg float in water? (Fresh eggs sink, bad ones float)",
      type: "yesno",
    },
    {
      key: "smell_test",
      text: "Does it smell sulfuric or rotten?",
      type: "yesno",
    },
    {
      key: "boiled",
      text: "If boiled, does the egg still smell bad after peeling?",
      type: "yesno",
    },
    {
      key: "discolor",
      text: "Are there unusual colors inside (green, pink, or black spots)?",
      type: "yesno",
    },
    {
      key: "shell_cracks",
      text: "Is the shell cracked or leaking?",
      type: "yesno",
    },
  ],
  "Bakery Items": [
    { key: "mold_presence", text: "Any mold or unusual spots?", type: "yesno" },
    {
      key: "texture_change",
      text: "Is the texture unusually hard or soggy?",
      type: "hardsoggy",
    },
    {
      key: "airtight",
      text: "Has it been stored in an airtight container or wrapped properly? ",
      type: "airwrap",
    },
    { key: "old", text: "How many days old is it?", type: "twofive" },
    {
      key: "smell_test",
      text: "Does it have a stale or odd smell?",
      type: "yesno",
    },
  ],
  "Cooked Food": [
    {
      key: "refrigerated",
      text: "Has it been stored in the refrigerator within 2 hours of cooking?",
      type: "yesno",
    },
    { key: "unusual_smell", text: "Does it smell unusual?", type: "yesno" },
    { key: "taste_check", text: "If tasted, does it seem off?", type: "yesno" },
    {
      key: "roomtemp",
      text: "Was the food left at room temperature for more than 4 hours??",
      type: "yesno",
    },
    {
      key: "dry_moist",
      text: "Are the vegetables stored in a dry or moist environment inside the sealed container?",
      type: "drymoist",
    },
  ],
  "Soft Cheeses": [
    {
      key: "mold_presence",
      text: "Any mold (except for intentionally moldy cheeses like blue cheese)?",
      type: "yesno",
    },
    {
      key: "smell_test",
      text: "Does it smell strongly sour or ammonia-like?",
      type: "yesno",
    },
    { key: "color", text: "Has the cheese changed color?", type: "yesno" },
    {
      key: "liquid",
      text: "Is there excess liquid or separation in the container?",
      type: "yesno",
    },
    {
      key: "texture_change",
      text: "Has it become excessively slimy?",
      type: "yesno",
    },
  ],
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

  useEffect(() => {
    startChatbot();
  }, []);

  useEffect(() => {
    if (selectedSubcategory && currentQuestionIndex >= 0) {
      const currentQuestions = categoryQuestions[selectedSubcategory] || [];
      if (currentQuestionIndex < currentQuestions.length) {
        const nextQuestion = currentQuestions[currentQuestionIndex];
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: nextQuestion.text },
        ]);
      } else {
        evaluateQuality();
      }
    }
  }, [currentQuestionIndex]); // Triggers when question index changes

  const startChatbot = () => {
    setMessages([
      {
        sender: "bot",
        text: "Welcome to the Food Quality Checker! First, select the food category.",
      },
    ]);
    setSelectedCategory("");
    setSelectedSubcategory("");
    setCurrentQuestionIndex(-1);
    setUserResponses({});
  };

  const handleUserInput = (response) => {
    setMessages((prev) => [...prev, { sender: "user", text: response }]);

    if (!selectedCategory) {
      setSelectedCategory(response);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Great! Now select the specific food type under ${response}.`,
        },
      ]);
      return;
    }

    if (!selectedSubcategory) {
      setSelectedSubcategory(response);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `You selected ${response}. Let's check its quality.`,
        },
      ]);

      if (
        categoryQuestions[response] &&
        categoryQuestions[response].length > 0
      ) {
        setTimeout(() => setCurrentQuestionIndex(0), 500);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "No quality check questions available for this item.",
          },
        ]);
      }
      return;
    }

    const currentQuestions = categoryQuestions[selectedSubcategory] || [];
    if (
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < currentQuestions.length
    ) {
      const currentQuestion = currentQuestions[currentQuestionIndex];

      setUserResponses((prev) => ({
        ...prev,
        [currentQuestion.key]: response,
      }));
      setTimeout(
        () => setCurrentQuestionIndex((prevIndex) => prevIndex + 1),
        500
      );
    }
  };

  const evaluateQuality = () => {
    let spoilageIndicators = Object.values(userResponses).filter(
      (ans) => ans === "Yes"
    ).length;
    let resultMessage =
      spoilageIndicators >= 2
        ? "⚠ Warning! The food is likely unsafe to consume."
        : "✅ Good to go! The food appears safe to consume.";
    setMessages((prev) => [...prev, { sender: "bot", text: resultMessage }]);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          {!selectedCategory ? (
            Object.keys(subcategories).map((cat) => (
              <button className="btn"
                id={`category-${cat}`}
                key={cat}
                onClick={() => handleUserInput(cat)}
              >
                {cat}
              </button>
            ))
          ) : !selectedSubcategory ? (
            subcategories[selectedCategory].map((sub) => (
              <button className="btn"
                id={`subcategory-${sub}`}
                key={sub}
                onClick={() => handleUserInput(sub)}
              >
                {sub}
              </button>
            ))
          ) : currentQuestionIndex >= 0 &&
            currentQuestionIndex <
              (categoryQuestions[selectedSubcategory]?.length || 0) ? (
            (() => {
              const question =
                categoryQuestions[selectedSubcategory][currentQuestionIndex];
              let options = [];

              if (question.type === "yesno") {
                options = ["Yes", "No"];
              } else if (question.type === "hardsoggy") {
                options = ["Hard/Soggy", "No"];
              } else if (question.type === "drymoist") {
                options = ["Dry", "Moist"];
              } else if (question.type === "airwrap") {
                options = ["Airtight/Wrapped", "No"];
              } else if (question.type === "twofive") {
                options = ["Less than 5 days", "More than 5 days"];
              }

              return options.length > 0 ? (
                options.map((option) => (
                  <button className="btn"
                    id={`option-${option.replace(/\s+/g, "-")}`}
                    key={option}
                    onClick={() => handleUserInput(option)}
                  >
                    {option}
                  </button>
                ))
              ) : (
                <input
                  id="expiry-date-input"
                  type="date"
                  placeholder="Enter expiry date"
                  onChange={(e) =>
                    setUserResponses((prev) => ({
                      ...prev,
                      expiry_date: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handleUserInput(e.target.value);
                    }
                  }}
                  style={{
                    width: "100%",
                    color: "black",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                />
              );
            })()
          ) : (
            <button className="btn" id="restart-button" onClick={startChatbot}>
              Restart Quality Check
            </button>
          )}
        </div>
    </div>
      <button className="btn" id="button-back" onClick={()=>navigate('/volunteer')}>
              Back to Main Page
      </button>
    </>
  );
};

export default Chatbot;