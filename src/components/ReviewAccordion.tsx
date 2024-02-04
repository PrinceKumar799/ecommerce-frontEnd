import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Review } from "./ProductDetails";
interface ReviewComponentProps {
  reviews: Review[] | [];
  productId: string;
}
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ChangeEvent, useState } from "react";
const ReviewAccordion: React.FC<ReviewComponentProps> = ({
  reviews,
  productId,
}) => {
  console.log("Accordion", productId);
  const [reviewsData, setReviewData] = useState(reviews);
  const [content, setContent] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleAddReview = () => {
    const token = localStorage.getItem("authToken");
    if (!token) alert("Kindly login again");

    axios
      .post(
        `http://localhost:3000/products/${+productId}/addReview`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        if (!reviewsData) setReviewData([response?.data]);
        setReviewData((prevReviews) => [...prevReviews, response?.data]);
        setContent("");
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
  return (
    <Accordion className="accordion-cnt">
      <AccordionSummary>
        <Typography variant="h5">Reviews</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" sx={{ overflowY: "scroll" }}>
          <TextField
            placeholder="post a review"
            fullWidth
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    startIcon={<SendIcon />}
                    variant="contained"
                    onClick={handleAddReview}
                  >
                    Post
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {reviewsData?.map((review) => {
            return (
              <Box className="review-accordion-outer-cnt">
                <Box className="review-accordion-inner-cnt">
                  <Avatar></Avatar>
                  <Typography variant="h6" color="GrayText">
                    {review.user.firstName + " " + review.user.lastName}
                  </Typography>
                </Box>
                <Typography variant="h5">{review.content}</Typography>
              </Box>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReviewAccordion;
