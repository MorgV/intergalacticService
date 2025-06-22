// Layout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import styles from './Layout.module.css'

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Outlet />
        </div>
    );
};
