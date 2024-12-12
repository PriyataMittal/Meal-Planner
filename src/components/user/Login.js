import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // State to trigger redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token in localStorage
        setLoggedIn(true); // Trigger redirection to home page
      } else {
        setError(data.message || "Invalid credentials!");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again later.");
    }
  };

  // Inline CSS Styles
  const styles = {
    // Container styles for centering
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f7fa",
    },
    formContainer: {
      width: "100%",
      maxWidth: "400px",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "20px",
      letterSpacing: "1px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      margin: "12px 0",
      padding: "14px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.3s ease",
    },
    inputFocus: {
      border: "1px solid #007BFF",
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.3)",
    },
    button: {
      padding: "14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "20px",
      transition: "background-color 0.3s, transform 0.2s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: "15px",
      fontSize: "14px",
      fontWeight: "500",
    },
    footer: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#666",
    },
    footerLink: {
      color: "#007BFF",
      textDecoration: "none",
    },
  };

  // Redirect to home page after successful login
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style = { ...styles.input, ...styles.inputFocus })}
              onBlur={(e) => (e.target.style = styles.input)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style = { ...styles.input, ...styles.inputFocus })}
              onBlur={(e) => (e.target.style = styles.input)}
            />
          </div>
          <button
  type="submit"
  style={styles.button}
  onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
  onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
  onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
  onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
>
  Login
</button>

        </form>
        <div style={styles.footer}>
          <p>
            Don't have an account? <a href="/signup" style={styles.footerLink}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;