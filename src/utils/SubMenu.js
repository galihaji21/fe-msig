import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Icons } from "views";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items } = props;
  console.log('tai',items)
  return (
    <div>
      <NavItem
        onClick={toggle}
        className={classNames({ "menu-open": !collapsed })}
      >
        <NavLink className="dropdown-toggle">
          {/* <Icons icon={icon} className="mr-2" /> */}
          {title}
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!collapsed}
        navbar
        className={classNames("items-menu", { "mb-1": !collapsed })}
      >
        {items.map((item, index) => (
          
          <NavItem key={index} className="pl-4">
            <NavLink tag={Link} to={'/admin'+item.path}>
              {item.name}
            </NavLink>
          </NavItem>
         
        ))
        
        }
      </Collapse>
    </div>
  );
};

export default SubMenu;
