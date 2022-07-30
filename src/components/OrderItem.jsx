import React from "react";
import st from "../pages/OrdersPage/OrdersPage.module.scss";

const OrderItem = ({ count, price, name, phone, orderItems }) => {
    return (
        <div className={st.list__item}>
            <p className={st.count}>{count}</p>
            <div className={st.title}>
                <p>
                    Ім'я: <span>{name[0].toUpperCase() + name.slice(1)}</span>
                </p>
                <p>
                    Телефон: <span>{phone}</span>
                </p>
                <p>
                    Ціна: <span>{price} грн</span>
                </p>
            </div>
            <div className={st.list}>
                {orderItems.map((item, count) => (
                    <p key={item.id}>
                        <span>{count + 1}</span>. <span>{item.title}, </span>
                        <span>{item.size} см, </span>
                        <span>{item.edge}</span>, Кількість:{" "}
                        <span>{item.count}</span>
                    </p>
                ))}
            </div>
            <svg
                width="25"
                height="25"
                viewBox="0 0 10 10"
                fill="#111"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"></path>
                <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"></path>
            </svg>
        </div>
    );
};

export default OrderItem;
