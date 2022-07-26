import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../components/UI/Button/Button";
import { setAuth } from "../../../store/slices/authSlice";
import st from "./LoginPage.module.scss";

const LoginPage = () => {
    const [wrongData, setWrongData] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
        },
        validationSchema: Yup.object({
            login: Yup.string().required("Логін обов'язковий"),
            password: Yup.string().required("Пароль обов'язковий"),
        }),
        onSubmit: (values) => {
            values.login === process.env.REACT_APP_LOGIN &&
            values.password === process.env.REACT_APP_PASSWORD
                ? dispatch(setAuth(true))
                : setWrongData(true);
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className={st.form}
        >
            <input
                id="login"
                type="text"
                placeholder="Логін"
                value={formik.values.login}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.login && formik.errors.login && (
                <p>{formik.errors.login}</p>
            )}
            <input
                id="password"
                type="password"
                placeholder="Пароль"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
                <p>{formik.errors.password}</p>
            )}
            {wrongData && <p>Неправильні дані</p>}

            <Button appearance="primary" type="submit">
                Увійти
            </Button>
            <Link className={st.back} to="/">
                <Button appearance="ghost">{"< На головну"}</Button>
            </Link>
        </form>
    );
};

export default LoginPage;
