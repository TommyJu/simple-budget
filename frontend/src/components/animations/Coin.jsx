import { useLottie } from "lottie-react";
import coinAnimation from "@/assets/coin.json";

const Coin = () => {
  const options = {
    animationData: coinAnimation,
  };

  const { View } = useLottie(options);

  return (
    <div style={{ width: 160, height: 160 }}>
      {View}
    </div>
  );
};

export default Coin;