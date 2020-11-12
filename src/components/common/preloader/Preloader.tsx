import s from "../../Users/Users.module.css";
import preloader from "../../../images/loading.svg";
import React from "react";

const Preloader: React.FC = () => {
  return  <div>
        <img className={s.loading} src={preloader} alt=""/>
    </div>
}
export default Preloader