import { useEffect, useState } from "react";
import st from "./Slider.module.scss";

const data = [
    {
        id: 1,
        href: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
        title: "Барбекю",
    },
    {
        id: 2,
        href: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
        title: "Пепероні",
    },
    {
        id: 3,
        href: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
        title: "Чотири сезони",
    },
    {
        id: 4,
        href: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
        title: "Маргарита",
    },
    {
        id: 5,
        href: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
        title: "Чотири сири",
    },
];

const sliderItem = (type, current, length) => {
    const next = current === length ? 0 : current + 1;
    const previous = current === 0 ? length : current - 1;

    return (
        <div className={st.item}>
            <img
                src={data[type === "next" ? next : previous].href}
                alt={data[type === "next" ? next : previous].title}
                width={200}
                height={200}
            />
            <h3>{data[type === "next" ? next : previous].title}</h3>
        </div>
    );
};

const Slider = () => {
    const updateTime = 3_000;
    const [time, setTime] = useState(Date.now());
    const length = data.length - 1;
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setCurrent(current === length ? 0 : current + 1);

        const interval = setInterval(() => setTime(Date.now()), updateTime);
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    return (
        <div className={st.wrapper}>
            <h2 className={st.title}>Асортимент: </h2>

            <div className={st.slider}>
                {sliderItem("previous", current, length)}

                <div className={st.active}>
                    <img
                        src={data[current].href}
                        alt={data[current].title}
                        width={300}
                        height={300}
                        style={{ marginLeft: "10px" }}
                    />
                    <h3>{data[current].title}</h3>
                </div>

                {sliderItem("next", current, length)}
            </div>
        </div>
    );
};

export default Slider;
