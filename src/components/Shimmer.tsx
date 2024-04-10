import { Box } from "@mui/material";

const Shimmer: React.FC = () => {
  console.log("Shimmer");
  return (
    <Box className="outer-cnt">
      {Array(12)
        .fill("")
        .map((el: string, i) => (
          <div
            className="inner-cnt1"
            key={i}
            style={{
              backgroundColor: "lightgray",
            }}
          ></div>
        ))}
    </Box>
  );
};

export default Shimmer;
