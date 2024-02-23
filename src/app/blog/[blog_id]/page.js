import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import { Box, Typography } from "@mui/material";

import BlogSlides from "components/Slides/BlogSlides";
import LoadingSpinner from "components/Spinner/LoadingSpinner";

import * as api from "api";

export const revalidate = 300;

const fetchBlog = async (blog_id) => {
  const blog = await api.getBlog(blog_id);
  return blog;
};

const SingleBlogPage = async ({ params }) => {
  const blog_id = params.blog_id;
  const blog = await fetchBlog(blog_id);

  if (!blog) {
    return notFound();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
