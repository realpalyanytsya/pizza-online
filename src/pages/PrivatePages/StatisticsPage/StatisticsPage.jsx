import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderHistory } from "../../../api/PizzaService";
import { calculateCountItems } from "../../../utils/workingWithArrays";
import st from "./StatisticsPage.module.scss";

const statInfo = (title, arr) => {
    return (
        <>
            <h3>{title}</h3>
            {calculateCountItems(arr).map((i, count) => (
                <p key={count}>
                    {i.item}, {i.count}
                </p>
            ))}
        </>
    );
};

const StatisticsPage = () => {
    const [data, setData] = useState([]);
    const [screens, setScreens] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [prices, setPrices] = useState([]);
    const [refresh, setRefresh] = useState(Date.now());
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getOrderHistory(setData);
    }, [refresh]);

    useEffect(() => {
        setPrices(data.map((i) => i.totalPrice));
        setScreens(data.map((i) => i.screen));
        setLanguages(data.map((i) => i.language));
        setPizzas(data.map((i) => i.items.map((j) => j.title)));
    }, [data]);

    const onClickSvg = () => {
        setAnimate(true);
        setRefresh(Date.now());

        setTimeout(() => setAnimate(false), 1_000);
    };

    return (
        <div className="main">
            <div className={st.statistics}>
                {screens.length > 0 &&
                pizzas.length > 0 &&
                languages.length > 0 ? (
                    <>
                        <svg
                            className={`${st.refresh} ${
                                animate ? st.refreshActive : ""
                            }`}
                            onClick={onClickSvg}
                            width="20"
                            height="20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 330.006 330.006"
                        >
                            <path
                                d="M304.302,209.419c-7.594-3.318-16.435,0.148-19.751,7.739c-20.766,47.527-67.69,78.236-119.546,78.236
		c-41.106,0-79.108-19.32-103.445-51.003l51.23,10.19c8.126,1.617,16.021-3.661,17.638-11.786
		c1.616-8.125-3.661-16.022-11.786-17.638l-84.004-16.709c-8.125-1.612-16.021,3.661-17.638,11.786L0.291,304.238
		c-1.616,8.125,3.661,16.022,11.786,17.638c0.988,0.196,1.972,0.291,2.942,0.291c7.01,0,13.276-4.94,14.696-12.077l9.148-45.992
		c29.972,38.123,76.202,61.296,126.142,61.296c63.78,0,121.496-37.77,147.036-96.225
		C315.358,221.579,311.893,212.736,304.302,209.419z"
                            />
                            <path
                                d="M317.929,8.12c-8.125-1.614-16.022,3.661-17.638,11.786l-9.149,45.997C261.169,27.783,214.94,4.611,165.005,4.611
		c-63.779,0-121.495,37.771-147.038,96.224c-3.317,7.591,0.148,16.434,7.739,19.751c1.956,0.854,3.993,1.259,5.999,1.259
		c5.781,0,11.29-3.362,13.753-8.998c20.768-47.527,67.693-78.237,119.548-78.237c41.099,0,79.1,19.316,103.437,50.995
		l-51.228-10.191c-8.127-1.615-16.022,3.66-17.639,11.785c-1.616,8.125,3.66,16.022,11.785,17.639l84.006,16.711
		c0.971,0.193,1.951,0.288,2.927,0.288c2.945,0,5.849-0.868,8.333-2.528c3.308-2.21,5.602-5.644,6.378-9.546l16.709-84.006
		C331.331,17.633,326.054,9.736,317.929,8.12z"
                            />
                        </svg>

                        <h2>
                            totalPrice:{" "}
                            {prices.length > 1 &&
                                prices.reduce((total, i) => total + i)}{" "}
                            грн.
                        </h2>

                        {statInfo("pizzas:", [].concat.apply([], pizzas))}

                        {statInfo("screens", screens)}

                        {statInfo("languages:", languages)}

                        <button onClick={() => navigate(-1)}>button</button>
                    </>
                ) : (
                    <p>Заванатження</p>
                )}
            </div>
        </div>
    );
};

export default StatisticsPage;
