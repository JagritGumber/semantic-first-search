import { SessionProvider } from "@hono/auth-js/react";
import { Route, Router, Switch } from "wouter";
import { AuthSuccess } from "./components/AuthSuccess";
import { ChatPage, LoginPage, SignUpPage } from "./pages";

function App() {
  return (
    <SessionProvider>
      <Router base="">
        <Switch>
          <Route path="/" component={ChatPage} />
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/signup" component={SignUpPage} />
          <Route path="/api/auth/success" component={AuthSuccess} />
          <Route>404: No such page!</Route>
        </Switch>
      </Router>
    </SessionProvider>
  );
}

export default App;
