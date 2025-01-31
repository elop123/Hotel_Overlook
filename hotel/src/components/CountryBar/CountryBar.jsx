import React from 'react'
import { useState, useEffect } from 'react';
import style from './CountryBar.module.scss'

export const CountryBar = ({ countrySelect }) => {
    const[country, setCountry]= useState([]);
    const[error, setError] = useState();
    const[loading, setLoading] = useState(true);

    const url = `http://localhost:4000/destinations`;
    

    useEffect(() => {
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch the destination');
            }
            return res.json();
          })
          .then((data) => {
            if (data.length === 0) {
                setCountry('No country found');
            } else {
                setCountry(data);
            }
            console.log(data);
            
        })
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      }, [url]);
    
      if (loading) {
        return <p>Loading country...</p>;
      }
    
      if (error) {
        return <p className={style.error}>{error}</p>;
      }
    
      return (
        <section className={style.countryBarStyle}>
          {country.map((item) => (
            <article key={item.id} 
                     className={style.countryItem}
                     onClick={() => countrySelect(item.name)}>
              <h2 className={style.title}>{item.name}</h2>
            </article>
          ))}
        </section>
      );
    };
