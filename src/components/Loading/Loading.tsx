import React, { useState, useEffect } from "react";
import { ReactComponent as PaymentIcon } from "../../assets/payment-card.svg";
import "./Loading.css";

interface LoadingProps {
  isLoading: boolean;
  type: string;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, type }) => {
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (isLoading) {
      setAnimation("animate-moveAndWobble");
    } else {
      setAnimation("");
    }
  }, [isLoading]);

  return (
    <div>
      {type === "payment" && (
        <div className={`w-16 h-16 mx-auto ${animation}`}>
          <PaymentIcon className="w-full h-full" />
        </div>
      )}
      {/* Se pueden añadir otros tipos de cargas */}
    </div>
  );
};

export default Loading;
