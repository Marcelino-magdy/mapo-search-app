import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    position:'absolute',
    top:25,
    width:'100%',
    zIndex:2,
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:COLORS.white,
    padding:20,
    width:'90%',
    left:'5%',
    borderRadius:'50%'

  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default styles;
