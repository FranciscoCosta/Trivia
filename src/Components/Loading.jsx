import React, { Component } from 'react';
import './Loading.css';
import { motion } from 'framer-motion';

class Loading extends Component {
  render() {
    const loadingContainer = {
      width: '10rem',
      height: '10rem',
      display: 'flex',
      justifyContent: 'space-around',
    };
    const loadingCircle = {
      display: 'block',
      width: '2rem',
      height: '2rem',
      backgroundColor: 'crimson',
      borderRadius: '50%',
    };

    const loadingContainerVariants = {
      start: {
        transition: {
          staggerChildren: 0.2,
        },
      },
      end: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    const loadingCircleVariants = {
      start: {
        y: '0%',
      },
      end: {
        y: '60%',
      },
    };
    const loadingCircleTransition = {
      duration: 0.4,
      yoyo: Infinity,
      ease: 'easeInOut',
    };
    return (
      <div className="Loading">
        <div className="Loading__container">
          <div className="Loading__msg">
            <motion.div
              style={ loadingContainer }
              variants={ loadingContainerVariants }
              initial="start"
              animate="end"
            >
              <motion.span
                style={ loadingCircle }
                variants={ loadingCircleVariants }
                transition={ loadingCircleTransition }
              />
              <motion.span
                style={ loadingCircle }
                variants={ loadingCircleVariants }
                transition={ loadingCircleTransition }
              />
              <motion.span
                style={ loadingCircle }
                variants={ loadingCircleVariants }
                transition={ loadingCircleTransition }
              />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
