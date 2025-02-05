import { SessionProvider } from "@hono/auth-js/react";
import { Route, Switch } from "wouter";
import { AuthSuccess } from "./components/AuthSuccess";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";

function App() {
  return (
    <SessionProvider>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/api/auth/success" component={AuthSuccess} />
        <Route>404: No such page!</Route>
      </Switch>
    </SessionProvider>
  );
}

export default App;
