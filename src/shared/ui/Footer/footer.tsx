import Link from "next/link";

import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Spirit Defense Corps.{" "}
        <Link
          href="https://github.com/cronixXV"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </p>
    </footer>
  );
};
