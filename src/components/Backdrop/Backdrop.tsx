import { COLORS } from "@/constants/colors";

const Backdrop = () => (
  <div
    css={{
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: COLORS.black,
      opacity: 0.2,
      zIndex: 99,
    }}
  />
);

export default Backdrop;
