import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: (item,selected) => ({
    width: 250,
    padding: SIZES.medium,
    backgroundColor: selected === item ? COLORS.tertiary : COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer:(item,selected) => ({
    width: 70,
    height: 70,
    backgroundColor: selected === item ? COLORS.tertiary : COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
  },
  companyName: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: "white",
    marginTop: SIZES.small / 2,
    position:"absolute",
    left:110,
    top:32,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName:{
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.white,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
