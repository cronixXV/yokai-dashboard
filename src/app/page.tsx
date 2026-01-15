import Link from "next/link";
import styles from "./page.module.scss";
import { Footer } from "@/shared/ui/Footer/footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Yokai Monitoring System</h1>
        <p className={styles.subtitle}>
          Real-time tracking and capture of spiritual anomalies across Tokyo
        </p>
        <Link href="/monitoring" passHref>
          <button className={styles.goButton}>Go to Yokai Dashboard</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
