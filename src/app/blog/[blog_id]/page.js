import React, { Suspense } from "react";

import { Box, Typography } from "@mui/material";

import BlogSlides from "components/Slides/BlogSlides";
import SendGAPageView from "components/DataLoaders/SendGAPageView";
import LoadingSpinner from "components/Spinner/LoadingSpinner";

import * as api from "api";

export const revalidate = 300;

const fetchBlog = async (blog_id) => {
  const blog = await api.getBlog(blog_id);
  return blog;
};

const SingleBlogPage = async ({ params }) => {
  const blog_id = params.blog_id;
  console.log(blog_id);
  const blog = await fetchBlog(blog_id);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SendGAPageView pageTitle="Single Blog Page" blog_id={blog_id} />
      <div
        className="mediumBlogStyle"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
      <Typography
        variant="h2"
        sx={{ color: "grey.500", mt: 3, fontSize: "24px" }}
      >
        You might also be interested in
      </Typography>
      <Suspense fallback={<LoadingSpinner />}>
        <BlogSlides avoidBlogId={blog.id} />
      </Suspense>
    </Box>
  );
};

export default SingleBlogPage;
