import React from "react";
import styled from "styled-components";

export default function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  return (
    <div>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
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
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
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
  color: black;
  font-weight: 600;
  font-size: 1rem;

  &:hover {
    /* background: #6c747c; */
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    /* background: #a2a2a2; */
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #acb8ca;
    border-radius: 1rem;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
