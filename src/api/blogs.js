import db from "db";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";

export const getBlogs = async () => {
  const blogsCollectionRef = collection(db, "blogs");
  const blogsDocs = await getDocs(blogsCollectionRef);

  if (blogsDocs.empty) return [];

  return blogsDocs.docs.map((doc) => doc.data());
};

export const getBlog = async (blog_id) => {
  const blogsCollectionRef = collection(db, "blogs");
  const blogDoc = await getDoc(doc(blogsCollectionRef, blog_id));

  if (blogDoc.empty) return null;

  return blogDoc.data();
};
