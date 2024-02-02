import { Box } from "@mui/material";

const Shimmer: React.FC = () => {
  const shimmerCards = new Array(12);
  <Box className="outer-cnt">
    {shimmerCards.map((i) => (
      <Box className="inner-cnt1" sx={{ backgroundColor: "gray" }}>
        Shimmer
      </Box>
    ))}
  </Box>;
};

export default Shimmer;
