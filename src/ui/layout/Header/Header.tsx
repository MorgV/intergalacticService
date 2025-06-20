import { HeaderSelector } from "../HeaderSelector/HeaderSelector"
import style from "./Header.module.css"

export const Header = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.info}>
                <img src="/images/logo.svg" alt="Logo" width={'268px'} height={'59px'} />
                <div className={style.label}>Межгалактическая аналитика</div>
            </div>
            <HeaderSelector />
        </div>
    )
}
