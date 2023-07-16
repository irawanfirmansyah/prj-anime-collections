import { css } from "@emotion/react";
import Link from "next/link";

const Header = () => {
  return (
    <header
      css={css`
        padding: 1rem;
        position: sticky;
        top: 0;
      `}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">Anime Collections App</Link>
        <Link href="/collections">Anime Collections App</Link>
      </div>
    </header>
  );
};

export default Header;
