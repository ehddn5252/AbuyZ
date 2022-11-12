import React from "react";
import styled from "styled-components";

export default function CustomerPagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <div>
      <Nav>
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ color: "black" }}
        >
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
          style={{ color: "black" }}
        >
          &gt;
        </Button>
      </Nav>
    </div>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button`
  border: none;
  border-radius: 0.5rem;
  padding: 8px;
  margin: 0;
  background: white;
  color: #acb8ca;
  font-weight: 600;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-weight: 800;
    color: black;
    cursor: revert;
    transform: revert;
  }
`;
