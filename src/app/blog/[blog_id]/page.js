"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Box, Typography } from "@mui/material";

import BlogSlides from "components/Slides/BlogSlides";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import SendGAPageView from "components/DataLoaders/SendGAPageView";

import * as api from "api";

const SingleBlogPage = () => {
  const { blog_id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.getBlog(blog_id).then((blog) => setBlog(blog));
  }, []);

  if (!blog) return <CenteredLoadingSpinner />;

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
      <BlogSlides avoidBlogId={blog.id} />
    </Box>
  );
};

export default SingleBlogPage;
