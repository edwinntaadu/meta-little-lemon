import axios from "axios";
import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import "./Testimonials.css";

export default function Testimonials(props) {
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState([]);

  useEffect(() => {
    // Flag to check if the component is still mounted
    let isMounted = true;

    axios
      .get(`https://little-lemon-restaurant-database.onrender.com/testimonials`)
      .then((response) => {
        if (isMounted) {
          setTestimonial(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (isMounted) {
          setLoading(false);
        }
      });

    // Cleanup function to set the isMounted flag to false
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <article className="testimonials">
        <section>
          <div className="d-md-flex justify-content-between">
            {testimonial
              .slice(props.displayCountMin, props.displayCountMax)
              .map((testimonialItem) => (
                <div
                  key={testimonialItem["name"]}
                  className="testimonial d-flex"
                >
                  <TestimonialCard
                    testimonialItem={testimonialItem}
                  />
                </div>
              ))}
          </div>
        </section>
      </article>
    </>
  );
}
