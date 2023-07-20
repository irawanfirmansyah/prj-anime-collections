import { css } from "@emotion/react";
import Link from "next/link";
import { Container } from "@/components";

const Header = () => {
  return (
    <header
      css={css`
        padding: 1rem;
        position: sticky;
        top: 0;
      `}
    >
      <Container>
        <div
          css={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p css={{ fontSize: "2rem" }}>Anime Collections App</p>
          <nav
            css={{
              marginLeft: "3rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Link
              css={{
                fontSize: "1rem",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              href="/anime/list"
            >
              Animes
            </Link>
            <Link
              css={{
                fontSize: "1rem",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              href="/collection/list"
            >
              Collections
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
