import React, { useState, useEffect } from "react";
import style from "./NewsCard.module.scss";
import { useNavigate } from "react-router-dom";

export const NewsCard = () => {
  const [news, setNews] = useState([]); 
  const [showNews, setShowNews] = useState(null); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(true); 

const navigate= useNavigate();

  const url = `http://localhost:4000/news`;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the news");
        }
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setError("No news found");
        } else {
          setNews(data);
        }
        console.log(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p className={style.error}>{error}</p>;
  }

  
  return (
    <section className={style.cardNews}>
      {news.slice(0, 3).map((item) => (
        <article
          key={item.id}
          className={style.newsItem}
          onClick={() => navigate(`/news/${item.id}`)}
        >
          <img
            className={style.newsImg}
            src={`./images/${item.image.filename}`} 
            alt={item.title}
          />
          <h2 
          onMouseOver={() => setShowNews(item.id)} 
          onMouseOut={() => setShowNews(null)} 
          className={style.title}>{item.title.slice(0, 24)}</h2>
          {showNews === item.id && (
            <p className={style.teaser}>{item.teaser}</p>
          )}
          
        </article>
       
      ))}
    </section>
  );
};
