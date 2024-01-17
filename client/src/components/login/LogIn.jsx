import React, { useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import "../login/LogIn.css";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useLogInContext } from "../context/LoginContext";
import ErrorModal from "../Modals/ErrorMsg";
function LogIn() {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    paddingTop:"30px",
    width: "400px",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "green" };
  const btnStyle = { margin: "8px 0" };
  const { logIn, errMsg } = useLogInContext();
  const emailRef = useRef();
  const passRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    if (errMsg) {
      errorRef?.current?.showModal();
    }
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
      
    };
    // navigate("/")
    await logIn(user);
  };
  return (
    <main className="loginPage">
      <div className="login-container">
        {/* <h1>Log In</h1> */}
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <form onSubmit={(e) => handleSubmit(e)}>
            <section className="inputs">
              <TextField
                name="email"
                label="email"
                placeholder="Enter Email"
                fullWidth
                required
                ref={emailRef}
              />
              <TextField
                name="password"
                label="password"
                placeholder="Enter Password"
                type="password"
                fullWidth
                required
                ref={passRef}
              />
              <Button
                type="submit"
                color="success"
                variant="contained"
                style={btnStyle}
                fullWidth
              >
                Sign in
              </Button>
            </section>
          </form>

          <Typography>
            Do you have an account?{" "}
            <Link to="/signup">
              <span className="sp">Sign Up</span>{" "}
            </Link>
          </Typography>
        </Paper>
        <ErrorModal ref={errorRef} />
      </div>
    </main>
  );
}

export default LogIn;
