"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Box,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { imagesCdn } from "constants/constants";

import * as api from "api";

const BlogSlides = ({ is_latest, avoidBlogId }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.getBlogs().then((blogs) => {
      if (is_latest !== undefined)
        blogs = blogs.filter((blog) => blog.is_latest === is_latest);

      if (avoidBlogId !== undefined)
        blogs = blogs.filter((blog) => blog.id !== avoidBlogId);
      setBlogs(blogs);
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        overflowX: "scroll",
        padding: 2,
        minHeight: 450,
      }}
    >
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            minWidth: 300,
            margin: 1,
            minHeight: 450,
          }}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={`${imagesCdn}/${blog.image_path}`}
            title="NIE blog"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ minHeight: 55 }}
            >
              {blog.minified_title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog.minified_content}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={blog.blog_path}>Read publication</Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default BlogSlides;
