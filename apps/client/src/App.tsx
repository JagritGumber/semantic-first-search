import { SessionProvider } from "@hono/auth-js/react";
import { Route, Router, Switch } from "wouter";
import { AuthSuccess } from "./components/AuthSuccess";
import { ChatPage, LandingPage, LoginPage, SignUpPage } from "./pages";

function App() {
  console.log(import.meta.env);
  return (
    <SessionProvider>
      <Router base="">
        <Switch>
          <Route path="/" component={LandingPage} />

          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/signup" component={SignUpPage} />

          <Route path="/chat" component={ChatPage} />
          <Route path="/api/auth/success" component={AuthSuccess} />
          <Route>404: No such page!</Route>
        </Switch>
      </Router>
    </SessionProvider>
  );
}

export default App;
