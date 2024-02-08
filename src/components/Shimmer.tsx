import { Box } from "@mui/material";

const Shimmer: React.FC = () => {
  const shimmerCards = new Array(12);
  return (
    <Box className="outer-cnt">
      {shimmerCards.map((i) => (
        <Box className="inner-cnt1" key={i} sx={{ backgroundColor: "gray" }}>
          Shimmer
        </Box>
      ))}
    </Box>
  );
};

export default Shimmer;
