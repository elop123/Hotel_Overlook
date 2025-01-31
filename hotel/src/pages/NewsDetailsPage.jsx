import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import  style from '../style/NewsDetailsPage.module.scss'

export const NewsDetailsPage = () => {
  const { newsId } = useParams();
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetails = async () => {
      const url = `http://localhost:4000/news/${newsId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch news details");
        }

        const data = await response.json();
        setNewsDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [newsId]);

  if (loading) return <p>Loading news details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    

    <div className={style.newsContainer}>
       <Breadcrumbs />
      <h2 className={style.newsTitle}>{newsDetails.title}</h2>
      <h3 className={style.teaser}>{newsDetails.teaser}</h3>
      <img
        src={`../../public/images/${newsDetails.image.filename}`}
        alt={newsDetails.title}
        className={style.newsImage}
      />
      <p className={style.newsContent}>{newsDetails.content}</p>
    </div>
  );
};

