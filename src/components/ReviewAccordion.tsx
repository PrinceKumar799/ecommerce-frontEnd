import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
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
import React, { ChangeEvent, useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
const ReviewAccordion: React.FC<ReviewComponentProps> = ({
  reviews,
  productId,
}) => {
  const [reviewsData, setReviewData] = useState(reviews);
  const [content, setContent] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleAddReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("content");
    // if (!content) {
    //   return;
    // }
    const token = localStorage.getItem("authToken");
    if (!token) alert("Kindly login again");

    axios
      .post(
        "http://localhost:3000/reviews",
        { content: `${content}`, productId: +productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        if (!reviewsData) setReviewData([response?.data]);
        setContent("");
        setReviewData((prevReviews) => [response?.data, ...prevReviews]);
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
        <Stack
          direction="column"
          sx={{ overflowY: "scroll", maxHeight: "300px" }}
        >
          <TextField
            placeholder="post a review"
            value={content}
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
          {reviewsData?.map((review) => (
            <Box className="review-accordion-outer-cnt" key={review.reviewId}>
              <Stack direction="column" alignItems="flex-start" spacing={1}>
                <Chip
                  size="small"
                  color="secondary"
                  variant="outlined"
                  // avatar={<Avatar>{review.user.firstName.charAt(0)}</Avatar>}
                  icon={<PermIdentityIcon />}
                  label={review.user.firstName + " " + review.user.lastName}
                />
                {/* <Avatar
                  sizes="small" // Add the actual avatar URL if available
                ></Avatar>
                <Typography variant="subtitle2" color="GrayText">
                  {review.user.firstName + " " + review.user.lastName}
                </Typography> */}
                <Typography variant="subtitle1">{review.content}</Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReviewAccordion;
