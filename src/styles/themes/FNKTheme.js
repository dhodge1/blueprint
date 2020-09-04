const colorPalette = {
  grapefruit: "#FF626A",
  pink: "#FF9CA1",
  blueberry: "#24316C",
  lightBlue: "#89CAF7",
  notifyBlue: "#A8E7FA",
  habanero: "#FF4700",
  tangerine: "#FF9900",
  eggYolk: "#FFCC33",
  parsley: "#44AD58",
  mintChip: "#33CC99",
  kale: "#00613E",
  frosting: "#00C4FF",
  beet: "#B01D5C",
  wine: "#9F101A",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  mediumGray: "#4a4a4a",
  darkGray: "#333333",
  deepBlack: "#000000",
  black: "#1C1C1C",
  transparentBlack: "rgba(0, 0, 0, 0.54)",
};

const mediumWidth = "901px";
const wideWidth = "1235px";

export const FNKTheme = {
  colorPalette,
  colors: {
    primary: colorPalette.grapefruit,
    secondary: colorPalette.blueberry,
    premium: colorPalette.lightBlue,
    white: colorPalette.white,
    black: colorPalette.black,
    pink: colorPalette.pink,
    lightGray: colorPalette.lightGray,
    mediumGray: colorPalette.mediumGray,
    darkGray: colorPalette.darkGray,
    inactive: "#bbbbbb",
    primaryGradientStop1: colorPalette.eggYolk,
    primaryGradientStop2: colorPalette.grapefruit,
    secondaryGradientStop1: colorPalette.grapefruit,
    secondaryGradientStop2: colorPalette.beet,
    link: colorPalette.frosting,
    transparentBlack: colorPalette.transparentBlack,
    prevLiveClassLabel: colorPalette.deepBlack,
    notification: colorPalette.notifyBlue,
  },
  fontStyles: {
    lineHeight: {
      large: "30px",
    },
    sizes: {
      tiny: "12px",
      extraSmall: "14px",
      small: "16px",
      medium: "18px",
      mediumLarge: "20px",
      large: "22px",
      XL: "30px",
      extraLarge: "36px",
      XXL: "55px",
    },
    letterSpacing: {
      extraSmall: "0.5px",
      small: "1px",
      medium: "1.4px",
      large: "2px",
      normal: "normal",
    },
    weights: {
      thin: "400",
      normal: "500",
      semiBold: "600",
      bold: "700",
    },
    fontFamilies: {
      primary: "proxima-nova, sans-serif",
      condensed: "proxima-nova-condensed, sans-serif",
      quote: "Georgia, serif",
    },
  },
  margin: {
    none: "0",
    extraSmall: "5px",
    space: "7px",
    small: "10px",
    medium: "15px",
    large: "25px",
    extraLarge: "35px",
  },
  padding: {
    none: "0",
    extraSmall: "5px",
    space: "7px",
    small: "10px",
    medium: "15px",
    large: "25px",
    extraLarge: "35px",
  },
  page: {
    mediumWidth: mediumWidth,
    maxWidth: "1280px",
    wideWidth: wideWidth,
  },
  borderRadius: "6px",
  thinSectionBorder: "solid 1px #dbdbdb",
  premiumGradient:
    "background-image: linear-gradient(to right, #cfe7f9 0%, #87ccff 127%)",
  boxShadows: {
    light: "0 0 7px 0 rgba(0, 0, 0, 0.09);",
    heavy: "0 0 8px 0 #d5d5d5;",
  },
  avatarSizes: {
    extraSmall: "35px",
    small: "45px",
    medium: "75px",
    large: "105px",
    extraLarge: "135px",
  },
  recipeImageSizes: {
    small: "60px",
    large: "120px",
  },
  imageSizes: {
    leadCard: "1200px",
    mediumCard: "300px",
    smallCard: "151px",
    detailsCard: "213px",
  },
  navBarHeight: {
    mobile: "65px",
    desktop: "90px",
  },
  footerHeight: {
    default: "48px",
  },
  zIndex: {
    navBar: 100,
    classVideo: 75,
    classDetails: 50,
    shoppingList: {
      headerContainer: 1,
      styledShoppingList: 2,
      search: 3,
    },
  },
  transitions: {
    duration: "0.5s",
    breakpoints: {
      video: 0.3, // 30% of the video container height
    },
  },
  mediaQueries: {
    mobile: "max-width: 1023px",
    desktop: "min-width: 1024px",
    mediumDesktop: `min-width: ${mediumWidth}`,
    wideDesktop: `min-width: ${wideWidth}`,
    classLandingGrid: "min-width: 940px",
    xsMobile: "max-width: 400px",
  },
  video: {
    size: {
      default: 72, // % of the page width
      sticky: 62, // % of the page width
    },
    aspectRatio: 9 / 16,
  },
  debug: false,
};
