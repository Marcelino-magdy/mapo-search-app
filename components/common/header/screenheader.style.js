import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  LbtnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    position:"absolute",
    top:10,
    left:20,
    
  },
  RbtnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    position:"absolute",
    top:10,
    right:20,
    
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});

export default styles;
