import styled from "styled-components";
import {Route, Switch, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Calender from "./pages/Calender";
import Projects from "./pages/Projects";


const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    user-select: none;
  }
`

function App() {
    const location = useLocation();

    return (
        <>
            <Sidebar/>
            <Pages>
                <AnimatePresence exitBeforeEnter>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/team" component={Team}/>
                        <Route exact path="/calender" component={Calender}/>
                        <Route exact path="/projects" component={Projects}/>

                    </Switch>
                </AnimatePresence>
            </Pages>
        </>
    );
}

export default App;
