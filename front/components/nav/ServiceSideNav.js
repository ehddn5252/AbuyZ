import React from "react";
export default function ServiceSideNav(props) {
  const tap0Change = () => {
    props.setServiceTap(0);
  };
  const tap1Change = () => {
    props.setServiceTap(1);
  };

  return (
    <div>
      <div style={sidebarWrapper}>
        <div style={sidebarMenu}>
          <h3 style={sidebarTitle}>고객센터</h3>
          <ul style={sidebarList}>
            <li style={sidebarListItem}>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={tap0Change}
              >
                쇼핑 FAQ
              </button>
            </li>
            <li style={sidebarListItem}>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={tap1Change}
              >
                1:1문의
              </button>
            </li>
          </ul>
        </div>
      </div>
      <span>잇다 고객센터</span>
      <span>1899 - 7000</span>
    </div>
  );
}

const sidebarWrapper = {
  padding: "20px",
  color: "black",
};

const sidebarMenu = {
  marginBottom: "2rem",
};

const sidebarTitle = {
  fontSize: "3rem",
  color: "rgb(197, 197, 197)",
};

const sidebarList = {
  listStyle: "none",
  padding: "0.5rem",
};

const sidebarListItem = {
  padding: "1rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  fontSize: "2rem",
};
