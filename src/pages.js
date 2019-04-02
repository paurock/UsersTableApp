import { Link } from "react-router-dom";
import { MainMenu } from "./menus";
import { PeopleList } from "./users";
import { PeopleListH } from "./usersH";
import "./stylesheets/pages.scss";

const PageTemplate = ({ children }) => (
  <div className="page">
    <MainMenu />
    {children}
  </div>
);

export const Home = () => (
  <div className="home">
    <h1>My App</h1>
    <nav>
      <Link to="users">
        <button type="button" className="btn btn-light">
          [Users]
        </button>
      </Link>
      <Link to="usersH">
        <button type="button" className="btn btn-light">
          [UsersH]
        </button>
      </Link>
    </nav>
  </div>
);

export const Users = () => (
  <PageTemplate>
    <section className="users">
      <PeopleList />
    </section>
  </PageTemplate>
);

export const UsersH = () => (
  <PageTemplate>
    <section className="users">
      <PeopleListH />
    </section>
  </PageTemplate>
);

export const Whoops404 = ({ location }) => (
  <div className="whoops-404">
    <h1>Resource not found at '{location.pathname}'</h1>
  </div>
);
