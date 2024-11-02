// src/components/ContactUsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
import "../assets/styles/contactus/style.css";

const ContactUsPage = () => {
  const { activeTheme, activeBg } = useTheme();

  // Refs for each contentEditable field
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    // Apply active theme to the root element
    const root = document.getElementById("contactus-page");
    root.style.setProperty("--color", activeTheme.background);
    root.style.setProperty("--text", activeTheme.color);
    root.style.setProperty("--title", activeBg.color);
  }, [activeTheme, activeBg]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Extract data from contentEditable fields
    const name = nameRef.current.innerText;
    const message = messageRef.current.innerText;
    const email = emailRef.current.innerText;

    // You can now use the form data as needed
    console.log("Name:", name);
    console.log("Message:", message);
    console.log("Email:", email);

    // Clear the fields if needed
    nameRef.current.innerText = '';
    messageRef.current.innerText = '';
    emailRef.current.innerText = '';
  };

  return (
    <div className="contactus-page" id="contactus-page">
      <div className="wrapper">
        <h1>Letter-like form with inline fields</h1>
        <form className="form__contact" onSubmit={onSubmitHandler}>
          <fieldset>
            <p>Hey, Ujjwal!</p>
            <p>
              My name is{" "}
              <span
                ref={nameRef}
                className="form__field field--name"
                data-placeholder="your name"
                tabIndex="1"
                contentEditable
              ></span>{" "}
              and I&apos;m writing to you since I&apos;m interested in{" "}
              <span
                ref={messageRef}
                className="form__field field--message"
                data-placeholder="your message"
                tabIndex="2"
                contentEditable
              ></span>
              .
            </p>
            <p>
              This is my{" "}
              <span
                ref={emailRef}
                className="form__field field--email"
                data-placeholder="email address"
                tabIndex="3"
                contentEditable
              ></span>
              .
            </p>
            <p>Hope to get in touch soon. Cheers!</p>
            <button type="submit" className="button button--xlarge" tabIndex="4">
              Send message &#187;
            </button>
          </fieldset>
        </form>
      </div>

      {/* SVG Background Filters */}
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
      >
        <defs>
          <filter id="blur0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 0" />
          </filter>
          <filter id="blur1">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 5" />
          </filter>
          <filter id="blur2">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 10" />
          </filter>
          <filter id="blur3">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 15" />
          </filter>
          <filter id="blur4">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 20" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default ContactUsPage;
