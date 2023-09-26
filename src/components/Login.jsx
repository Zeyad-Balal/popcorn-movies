const Login = () => {
  return (
    <div className="login-card">
      <form className="login-form">
        <div className="form-group">
          <h2>
            <i>Sign in</i>
          </h2>
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="button">Login</button>
        <div className="forget-create-container">
          <a href="#1111" className="create">
            Create Account
          </a>
          <a href="#111" className="forget">
            Forget Password?
          </a>
        </div>
      </form>
    </div>
  );
};
export default Login;
